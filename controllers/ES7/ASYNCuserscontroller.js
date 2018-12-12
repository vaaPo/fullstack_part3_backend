const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../../models/user'); //User

//UserUser
//UserUser.format

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const existingUser = await User.find({username: body.username})
    if (existingUser.length>0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    /**Voisimme toteuttaa käyttäjien luomisen yhteyteen myös muita tarkistuksia,
     *  esim. onko käyttäjätunnus tarpeeksi pitkä, 
     * koostuuko se sallituista merkeistä 
     * ja onko salasana tarpeeksi hyvä. Jätämme ne kuitenkin harjoitustehtäväksi.
     * 
     */
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(User.format(savedUser));
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error: 'something went wrong...' });
  }
});

usersRouter.get('/', async (request, response) => {
  try {const users = await User
    .find({}, {
      __v: 0
    })
    .populate('notes')                   // non-consistent outer-join to notes chained to find
    ;
  response.json(users.map(User.format)); //User.format defined in models/user.js
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'something went royally wrong in your request' });
  }
});

module.exports = usersRouter;
/**
 * const usersRouter = require('./controllers/ES7/ASYNCuserscontroller')

// ...

app.use('/api/users', usersRouter)

 */