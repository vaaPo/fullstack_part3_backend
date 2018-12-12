const notesRouter = require('express').Router();
//const modelsnote = require('../../models/note');
const Note = require('../../models/note');
const User = require('../../models/user');
//const modelsuser = require('../../models/user'); //User

// call me Note.format(note)

//console.log('notesRouter awake');
//console.log('require ../models/note');
/**
A router object is an isolated instance of middleware and routes.
You can think of it as a “mini-application,”
capable only of performing middleware and routing functions.
Every Express application has a built-in app router.
*/
/** this is ES7 async/await controller version
 *  this is going to be ported from ES6 promises to ES7 async await */
/** the ES6 promises versions are in their own directory */
notesRouter.get('/', async (request, response) => {//notesRouter.get('/'
  try { const notes = await Note
    .find({}, {
      __v: 0
    })
    .populate('user', {
      username: 1,
      name: 1
    });
  response.json(notes.map(Note.format));
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'something went royally wrong in your request' });
  }
}); //notesRouter.get('/'

notesRouter.get('/:id', async (request, response) => {//notesRouter.get('/:id'
  try {
    const note = await Note.findById(request.params.id);

    if (note) {
      response.json(Note.format(note));
    } else {
      response.status(404).end(); // request ok format, but id not found = 404 !!!
    }

  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformatted id' });
  }
}); //notesRouter.get('/:id'

notesRouter.post('/', async (request, response) => { //('/api/notes'
  try {
    const body = request.body;

    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' });
    }
    const user = await User.findById(body.userId);

    const note = new Note({
      content: body.content,
      important: body.important === undefined ? false : body.important,
      date: new Date(),
      user: user._id
    });

    //console.log('notesRouter.post user._id',note.user);
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();                                      // stores to users collection the new note id for the user, so user can have several notes
    response.json(Note.format(note));
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error: 'something went wrong...' });
  }
}); //notesRouter.post('/'


notesRouter.put('/:id', async (request, response) => { //notesRouter.put('/:id'
  //console.log('notesRouter.put request.params.id', request.params.id);
  const body = request.body;
  //console.log('notesRouter.put body.content:', body.content);
  //console.log('notesRouter.put body.important:', body.important);

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    });
  }
  try {
    const savedNote = await Note
      .findByIdAndUpdate(request.params.id, {
        $set: {
          important: body.important
        }
      }, {
        new: true
      });
    response.json(Note.format(savedNote));
  } catch (exception) {
    console.log(exception);
    response.status(400).json({ error: 'something went wrong...' });
  }
}); //notesRouter.put('/:id'

notesRouter.delete('/:id', async (request, response) => { ///api/notes/:id
  try {
    await Note.findByIdAndRemove(request.params.id);

    response.status(204).end(); //no content
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformatted id' }); // e.g. FOOBAR
  }
});  //notesRouter.delete('/api/notes/:id


//}
module.exports = notesRouter;