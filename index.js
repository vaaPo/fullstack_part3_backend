const express = require('express');
const app = express();
const repl = require('repl');
const bodyParser = require('body-parser');
let nos=require('./datafiles/Notes/notes');
let pers=require('./datafiles/PhoneBook/persons');

let notes=nos;
let persons=pers;

//let notes=require('./datafiles/Notes/notes');
//import persons from './datafiles/PhoneBook';

app.use(bodyParser.json())

console.log('hello world');
console.log('notes',notes);
console.log('persons',persons);
console.log('persons.length',persons.length);


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
    console.log('app.get /');
});

app.get('/info', (req, res) => {
    personsCnt = persons.length;
    notesCnt = notes.length;
    // Use of Date.now() function 
    var dn = Date(Date.now()); 
    
    // Converting the number of millisecond in date string 
    requestDt = dn.toString();
  

    // Printing the current date                     
    console.log('app.get /info', personsCnt, requestDt);
    res.send('PhoneBook has '
              +personsCnt
              +' persons'
              +'<br>'
              +requestDt
              +'<br>'
              +'/notes '
              +notesCnt
              +'<br>'
              +'/api/persons '
              +personsCnt
              );
});
  //http://localhost:3001/info


app.get('/notes', (req, res) => {
    res.json(notes);
    console.log('app.get /notes',notes);

});

app.get('/api/persons', (req, res) => {
    res.json(persons);
    console.log('app.get /persons',persons);
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

//http://localhost:3001/api/persons/5
app.get('/api/persons/:id', (request, response) => {
  //const id = request.params.id;
  const id = Number(request.params.id);
  console.log('app.get /api/persons/:id',id);
  console.log(persons.map(person => person.id));
  //const note = notes.find(note => note.id === id);
  const person = persons.find(person => {
    console.log('app.get /api/persons/:id',person.id, typeof person.id, id, typeof id, person.id === id);
    return person.id === id;
  });
  console.log('app.get /api/persons/notes/:id',person);
  if ( person ) {             // truthy https://developer.mozilla.org/en-US/docs/Glossary/Truthy
    response.json(person);
  } else {                  // falsy https://developer.mozilla.org/en-US/docs/Glossary/Falsy
    response.status(404).end();
  };
});


app.delete('/api/persons/:id', (request, response) => {
      const id = Number(request.params.id);
      console.log('app.delete /api/persons/:id',id);
      persons = persons.filter(person => person.id !== id)
    
      response.status(204).end()
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
