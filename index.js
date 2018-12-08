const express = require('express');
const app = express();
const repl = require('repl');
const bodyParser = require('body-parser');
let nos=require('./datafiles/Notes/notes');
let notes=nos;

//let notes=require('./datafiles/Notes/notes');
//import persons from './datafiles/PhoneBook';

app.use(bodyParser.json())


console.log('hello world');

 /**
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
 */

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
      if ( note ) {             // truthy https://developer.mozilla.org/en-US/docs/Glossary/Truthy
        response.json(note);
      } else {                  // falsy https://developer.mozilla.org/en-US/docs/Glossary/Falsy
        response.status(404).end();
      };
    });

  app.delete('/notes/:id', (request, response) => {
      const id = Number(request.params.id);
      console.log('app.delete /notes/:id',id);
      notes = notes.filter(note => note.id !== id)
    
      response.status(204).end()
   });
  
  const generateId = () => {
      const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1;
      return maxId + 1;
    };
  app.post('/notes', (request, response) => {
    console.log(request.headers);
    const body = request.body;

    if (body.content === undefined) {
      return response.status(400).json({error: 'content missing'});
    };
  
    const note = {
      content: body.content,
      important: body.important|| false,
      date: new Date(),
      id: generateId()
    };
    notes = notes.concat(note);
    console.log('app.post /notes',note);
    response.json(note);
  });

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  
  const msg = 'message';

  repl.start('> ').context.notes = notes;

//console.log(request.headers)
