const Note = require('../models/note');
//const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML on helppoa',
    important: false
  },
  {
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    important: true
  }
];

const format = (note) => {
  return {
    content: note.content,
    important: note.important,
    id: note._id
  };
};

const nonExistingId = async () => {
  const note = new Note();
  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map(format);
};

module.exports = {
  initialNotes, format, nonExistingId, notesInDb
};

/**
 * {
   "content": "test note via code Postman client 9 async for Zorro",
   "important": true,
   "userId": "5c115087c942ae71fb30477c"
}
 */