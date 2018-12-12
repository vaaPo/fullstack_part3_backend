const personsRouter = require('express').Router();
const modelspersons = require('../../models/person');
//console.log('personsRouter awake');
//console.log('require ../models/person');
/**
A router object is an isolated instance of middleware and routes.
You can think of it as a “mini-application,”
capable only of performing middleware and routing functions.
Every Express application has a built-in app router.
*/
/** this is ES7 async/await controller version
 *  this is going to be ported from ES6 promises to ES7 async await */
/** the ES6 promises versions are in their own directory */
personsRouter.get('/', async (request, response) => {//notesRouter.get('/'
  try { const persons = await modelspersons
    .Person
    .find({}, {
      __v: 0
    });
  response.json(persons.map(modelspersons.formatPerson));
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'something went royally wrong in your request' });
  }
}); //personsRouter.get('/'

personsRouter.post('/', (request, response) => { ///api/persons
  const body = request.body;

  if (body.name === undefined || body.name === null) {
    return response.status(400).json({
      error: 'name missing'
    });
  }
  if (body.phonenumber === undefined || body.phonenumber === null) {
    return response.status(400).json({
      error: 'phonenumber missing'
    });
  }
  console.log('body.name:', body.name);
  let nameToBeAdded = body.name;
  //https://stackoverflow.com/questions/9660587/do-something-if-nothing-found-with-find-mongoose
  modelspersons.Person
    .find({
      name: body.name
    }) //body.name})  "Arto Vihavainen"
    .then(result => {
      if (!result.length) { // this is wanted position, lets add
        console.log('result', result);
        console.log('we didnt find duplicate in mongodb');
        const person = new modelspersons.Person({
          name: body.name,
          phonenumber: body.phonenumber,
        });
        person //FIXME promise chain v2 for person post
          .save()
          .then(modelspersons.formatPerson)
          .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson);
          })
          .catch(error => {
            //console.log(error)
            response.status(400).send({
              error: 'something went royally wrong with your post'
            }); // bad request
          });
      } else {
        console.log('post person conflict error 409, name exists already', body.name);
        console.log('result', result);
        response.status(409).send({
          error: 'conflict error 409, name exists already'
        }); // request is conflict error 409, name exists
      }
    })
    .catch(error => {
      response.status(400).send({
        error: 'problem in post person '
      }); // bad request
    });
}); //personsRouter.post('/api/person'

personsRouter.delete('/:id', (request, response) => { ///api/persons/:id
  console.log('personsRouter.delete /api/persons/:id', request.params.id);
  //mongoose.set('useFindAndModify', false);
  modelspersons.Person
    .findByIdAndRemove(request.params.id)
    //        .findOneAndRemove({ _id: request.params.id })
    .then(result => {
      response.status(204).end(); //no content
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({
        error: 'malformatted id'
      });
    });
}); //personsRouter.delete('/api/persons/:id

personsRouter.put('/:id', (request, response) => { ///api/persons/:id
  console.log('personsRouter.put /api/persons request.params.id', request.params.id);
  const body = request.body;
  console.log('personsRouter.put body.name:', body.name);
  console.log('personsRouter.put body.phonenumber:', body.phonenumber);

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name missing'
    });
  }

  modelspersons.Person
    .findByIdAndUpdate(request.params.id, {
      $set: {
        phonenumber: body.phonenumber
      }
    }, {
      new: true
    },
    function (err, person) {
      if (err) return response.status(400).send({
        error: 'something went royally wrong with your put'
      });
      response.send(person);
    });
}); //personsRouter.put('/api/persons/:id'

module.exports = personsRouter;