//FIXME in index.js const Note = require('./models/notes')


const mongoose = require('mongoose');

//const url = 'mongodb://fullstack:sekred@ds211088.mlab.com:11088/fullstack-notes';

//mongoose.connect(url);

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
});
const formatNote = (note) => {
    return {
      content: note.content,
      date: note.date,
      important: note.important,
      id: note._id
    };
  };
module.exports = {
    Note: Note,
    formatNote: formatNote
};

/**
 * var modelsnotes = require('./models/notes');
...
modelsnotes.Note.findOne(...
 */


/** GENERIC formatNote
  const formatNote = (note) => {
  const formattedNote = { ...note._doc, id: note._id }
  delete formattedNote._id
  delete formattedNote.__v

  return formattedNote
};

 */

//module.exports = Note; //(Note,formatNote);
