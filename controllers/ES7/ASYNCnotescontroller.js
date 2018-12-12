const notesRouter = require('express').Router();
const modelsnote = require('../../models/note');
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
notesRouter.get('/', async (request, response) => {
  try { const notes = await modelsnote
    .Note
    .find({}, {
      __v: 0
    });
  response.json(notes.map(modelsnote.formatNote));
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'something went royally wrong in your request' });
  }
}); //notesRouter.get('/'


notesRouter.post('/', async (request, response) => { //('/api/notes'
  try {
    const body = request.body;

    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' });
    }
    const note = new modelsnote.Note({
      content: body.content,
      important: body.important === undefined ? false : body.important,
      date: new Date()
    });

    const savedNote = await note.save();
    response.json(modelsnote.formatNote(note));
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
    const savedNote = await modelsnote.Note
      .findByIdAndUpdate(request.params.id, {
        $set: {
          important: body.important
        }
      }, {
        new: true
      });
    response.json(modelsnote.formatNote(savedNote));
  } catch (exception) {
    console.log(exception);
    response.status(400).json({ error: 'something went wrong...' });
  }
}); //notesRouter.put('/:id'


notesRouter.get('/:id', async (request, response) => {
  try {
    const note = await modelsnote.Note.findById(request.params.id);

    if (note) {
      response.json(modelsnote.formatNote(note));
    } else {
      response.status(404).end(); // request ok format, but id not found = 404 !!!
    }

  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformatted id' });
  }
}); //notesRouter.get('/api/notes/:id'

notesRouter.delete('/:id', async (request, response) => { ///api/notes/:id
  try {
    await modelsnote.Note.findByIdAndRemove(request.params.id);

    response.status(204).end(); //no content
  } catch (exception) {
    console.log(exception);
    response.status(400).send({ error: 'malformatted id' });
  }
});  //notesRouter.delete('/api/notes/:id


//}
module.exports = notesRouter;