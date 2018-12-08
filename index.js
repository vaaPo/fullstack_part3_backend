const express = require('express');
const app = express();
const repl = require('repl');

console.log('hello world');

let notesx = {"notes": [
    {
      id: 1,
      content: 'HTML on helppoa',
      date: '2017-12-10T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Selain pystyy suorittamaan vain javascriptiä',
      date: '2017-12-10T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
      date: '2017-12-10T19:20:14.298Z',
      important: true
    }
  ]};
 
  let notes = [
    {
      id: 1,
      content: 'HTML on helppoa',
      date: '2017-12-10T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Selain pystyy suorittamaan vain javascriptiä',
      date: '2017-12-10T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
      date: '2017-12-10T19:20:14.298Z',
      important: true
    }
  ];


  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
    console.log('app.get /');
  });
  
  app.get('/notes', (req, res) => {
    res.json(notes);
    console.log('app.get /notes',notes);

  });

  const eti=notes.find(note=>note.id===2);
  console.log(eti);

    //http://localhost:3001/notes/1
  app.get('/notes/:id', (request, response) => {
      //const id = request.params.id;
      const id = Number(request.params.id);
      console.log('app.get /notes/:id',id);
      console.log(notes.map(note => note.id));
      //const note = notes.find(note => note.id === id);
      const note = notes.find(note => {
        console.log('app.get',note.id, typeof note.id, id, typeof id, note.id === id);
        return note.id === id;
      });
      console.log('app.get /notes/:id',note);
      response.json(note);
    });
  

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  
  const msg = 'message';

  repl.start('> ').context.notes = notes;


