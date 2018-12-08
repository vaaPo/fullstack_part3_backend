const express = require('express');
const app = express();
var morgan = require('morgan')
const cors = require('cors')


const repl = require('repl');
const bodyParser = require('body-parser');
let nos=require('./datafiles/Notes/notes');
let pers=require('./datafiles/PhoneBook/persons');

let notes=nos;
let persons=pers;

//let notes=require('./datafiles/Notes/notes');
//import persons from './datafiles/PhoneBook';

app.use(cors()); //https://github.com/expressjs/cors
//https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

app.use(bodyParser.json());
//app.use(morgan('combined'));
//https://github.com/expressjs/morgan#creating-new-tokens
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
/**
 * morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
});
 */


app.use(morgan(function (tokens, req, res) {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        JSON.stringify(req.body),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
      ].join(' ')
}));

//morgan(':method :url :status :res[content-length] - :response-time ms')

//app.use(morgan('tiny'));      //FIXME hw3.7 morgan('tiny')

console.log('hello world');
console.log('notes',notes);
console.log('persons',persons);
console.log('persons.length',persons.length);
//FIXME hw3.11 - add static files support for build directory e.g. fetching the index.js frontend stuff from there

app.use(express.static('build'));

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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  returnvalue = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log('getRandomIntInclusive',returnvalue);
  return returnvalue; //The maximum is inclusive and the minimum is inclusive 
};


 const generateId4notes = () => {
    let freeId=0;
    const maxId = notes.length > 0   ? notes.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1;
    let notesfreeId= maxId+1;    // this can be problematic :)
    console.log('generateId4notes',maxId,notesfreeId);
    return notesfreeId;
  };


  const generateId4persons = () => {
      const maxId = persons.length > 0 ? persons.map(n=>n.id).sort((a,b) => a - b).reverse()[0] : 1;
      const startId = maxId + 1;
      const endId = startId + 1000;
      let personfreeId = getRandomIntInclusive(startId,endId);
      console.log('generateId4persons',maxId,startId,endId,personfreeId);
      return personfreeId;
  };
/**  let foobar=generateId4notes;
  console.log('generateId4notes',foobar);

  let xyzzy=generateId4persons;
  console.log('generateId4persons',xyzzy);
 */
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
      id: generateId4notes()
    };
    notes = notes.concat(note);
    console.log('app.post /notes',note);
    response.json(note);
  });

  //http://localhost:3001/api/persons
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  app.post('/api/persons', (request, response) => {
    console.log('app.post api/person');
    console.log(request.headers);
    const logger = (request, response, next) => {
      console.log('Method:',request.method);
      console.log('Path:  ', request.path);
      console.log('Body:  ', request.body);
      console.log('---');
      next();
    };
    app.use(logger);
         
    const body = request.body;

    if (body.name === undefined || body.name === null) {
      return response.status(400).json({error: 'name missing'});
    } else {
      if (body.phonenumber === undefined || body.phonenumber === null) {
        return response.status(400).json({error: 'phonenumber missing'});
      };
  
      const duplicate = persons.find(person => person.name === body.name);
      if (duplicate===undefined) {
        const person = {
          name: body.name,
          phonenumber: body.phonenumber,
          id: generateId4persons()
        };
        persons = persons.concat(person);
        console.log('app.post /api/persons',person);
        response.json(person);
      } else {
        console.log('app.post api/person duplicate error',duplicate);      
        return response.status(400).json({error: 'name must be unique'});
      };
    };
  });

  const error = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'});
  };
  
  app.use(error);


  
  //const PORT = 3001;
  const PORT = process.env.PORT || 3001                   // for Heroku environment variable
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  
  const msg = 'message';

  repl.start('> ').context.notes = notes;

//console.log(request.headers)
