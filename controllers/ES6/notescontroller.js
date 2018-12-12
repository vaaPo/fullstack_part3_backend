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
/** this is ES6 promises "thenable" controller, look ES7 directory above for async/await versions */


notesRouter.get('/', (request, response) => { ///api/notes

  modelsnote.Note
    .find({}, {
      __v: 0
    })
    .then(notes => {
      if (notes) {
        response.json(notes.map(modelsnote.formatNote));
      } else {
        response.status(404).end(); // request ok format, but not found = 404 !!!
      }
    })
    .catch(error => {
    //console.log(error)
      response.status(400).send({
        error: 'something went royally wrong in your request'
      }); // bad request
    });

}); //notesRouter.get('/api/notes'

notesRouter.post('/', (request, response) => { ///api/notes
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const note = new modelsnote.Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  });
    /**
      note
        .save()
        .then(savedNote => {
          response.json(modelsnote.formatNote(savedNote));
        })
        .catch(error => {
          //console.log(error)
          response.status(400).send({ error: 'something went royally wrong with your post' });  // bad request
        });
 */
  /**      note                  //FIXME promise chain v1
      .save()
      .then(savedNote => {
        return modelsnote.formatNote(savedNote);
      })
      .then(savedAndFormattedNote => {
        response.json(savedAndFormattedNote)
      });
 */
  note //FIXME promise chain v2
    .save()
    .then(modelsnote.formatNote)
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote);
    })
    .catch(error => {
      //console.log(error)
      response.status(400).send({
        error: 'something went royally wrong with your post'
      }); // bad request
    });
}); //notesRouter.post('/api/notes'

notesRouter.put('/:id', (request, response) => { //
  //console.log('notesRouter.put request.params.id', request.params.id);
  const body = request.body;
  //console.log('notesRouter.put body.content:', body.content);
  //console.log('notesRouter.put body.important:', body.important);

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    });
  }
  modelsnote.Note
    .findByIdAndUpdate(request.params.id, {
      $set: {
        important: body.important
      }
    }, {
      new: true
    },
    function (err, note) {
      if (err) return response.status(400).send({
        error: 'something went royally wrong with your put'
      });
      response.send(note);
    });
  /**
     *   const body = request.body

    const note = {
      content: body.content,
      important: body.important
    }

    Note
      .findByIdAndUpdate(request.params.id, note, { new: true } )
      .then(updatedNote => {
        response.json(formatNote(updatedNote))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
     */
}); //notesRouter.put('/api/notes/:id'

notesRouter.get('/:id', (request, response) => { ///api/notes/:id
  modelsnote.Note
    .findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(modelsnote.formatNote(note));
      } else {
        response.status(404).end(); // request ok format, but id not found = 404 !!!
      }
    })
    .catch(error => {
      response.status(400).send({
        error: 'malformatted id'
      }); // bad request
    });
}); //notesRouter.get('/api/notes/:id'

notesRouter.delete('/:id', (request, response) => {  ///api/notes/:id
  //console.log('notesRouter.delete /api/notes/:id', request.params.id);
  mongoose.set('useFindAndModify', false);
  modelsnote.Note
    .findByIdAndRemove(request.params.id)
  //        .findOneAndRemove({ _id: request.params.id })
    .then(result => {
      response.status(204).end(); //no content
    })
    .catch(error => {
      //console.log(error);
      response.status(400).send({
        error: 'malformatted id'
      });
    });
}); //notesRouter.delete('/api/notes/:id


//}
module.exports = notesRouter;