const mongoose = require('mongoose');
// print process.argv

// lesson learned about 'initializing' these, if they are initialized inside if {} you get easily hurted :)
let mongouser = null;
let mongopassu = null;
let mlabdburl = null;
let usemongoose = null;
let nos = null;
let pers = null;
let notes = null;
let persons = null;
    //    const Note = require('./models/notes');
// LOTS OF middleware stuff here:


const express = require('express');
const app = express();
var morgan = require('morgan');
const cors = require('cors');


const repl = require('repl');
const bodyParser = require('body-parser');


//let notes =require('./datafiles/Notes/notes');
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

//./mongotrials/startbackend.sh

//console.log('process.argv.lastIndexOf',process.argv.lastIndexOf);
console.log('process.argv.length',process.argv.length);

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
    if (index===2) { mongouser=val;};
    if (index===3) { mongopassu=val;};
    if (index===4) { mlabdburl=val;};
  });

if (process.argv.length===5) {
  if (mlabdburl.length>0) {
    console.log("We are going to use mongoose!");
    let url = 'mongodb://'.concat(mongouser).concat(':').concat(mongopassu).concat('@').concat(mlabdburl); 
    console.log(mongouser,mongopassu,mlabdburl);
    console.log(mlabdburl.length);
    console.log(url);
    usemongoose = "YES";
    mongoose.connect(url);
    console.log('mongoose.connect(url) done');
    const modelsnote = require('./models/note');
    console.log('require ./models/note');
    modelsnote.Note
    .find({})
    .then(result => {
      console.log('find all notes');
      nos=result
      notes =result.map(modelsnote.formatNote);
      mongoose.connection.close();
      console.log("nos",nos);
      console.log("notes",notes);
    });
    //    const Person = require('./models/persons')
    const modelspersons = require('./models/person');
    console.log('require ./models/persons');

    modelspersons.Person
    .find({})
    .then(result => {
      console.log('find all persons');
      pers=result
      persons =result.map(modelspersons.formatPerson);
      mongoose.connection.close();
      console.log('mongoose.connection.close()');
      console.log("pers",pers);
      console.log("persons",persons);
    });
    app.get('/api/notes', (request, response) => {
      //console.log('mongodb /api/notes can see url?',url);
      mongoose.connect(url);
      console.log('mongoose.connect(url) done');
  
      modelsnote.Note
        .find({}, {__v: 0})
        .then(notes => {
          response.json(notes.map(modelsnote.formatNote))
          mongoose.connection.close();
          console.log('mongoose.connection.close()');
         });
    });
    app.post('/api/notes', (request, response) => {
      const body = request.body;
    
      if (body.content === undefined) {
        return response.status(400).json({error: 'content missing'});
      };
    
      const note = new modelsnote.Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
      });

      mongoose.connect(url);
      console.log('mongoose.connect(url) done');
    
      note
        .save()
        .then(savedNote => {
          response.json(modelsnote.formatNote(savedNote));
          mongoose.connection.close();
          console.log('mongoose.connection.close()');
        })
    }); //app.post('/api/notes'
    app.get('/api/notes/:id', (request, response) => {
      mongoose.connect(url);
      console.log('mongoose.connect(url) done');

      modelsnote.Note
        .findById(request.params.id)
        .then(note => {
          response.json(modelsnote.formatNote(note));
          mongoose.connection.close();
          console.log('mongoose.connection.close()');
        })
    }); //app.get('/api/notes/:id'
    
    
  } 
} else { 
  usemongoose="NO";
};
console.log("usemongoose:",usemongoose);


if (usemongoose==="NO") {
  console.log('We are using local static files due mongoose is',usemongoose);
  nos = require('./datafiles/Notes/notes');
  pers = require('./datafiles/PhoneBook/persons');
  
  notes = nos;
  persons = pers;
    
  console.log('notes',notes);
  console.log('persons',persons);
  console.log('persons.length',persons.length);
//  console.log('1 why me notes:',notes);

} else if (usemongoose==="YES") {

/** IMPORT THESE FROM models/notes.js
 *   const Note = mongoose.model('Note', {
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
*/
//const Note = require('./models/notes');  // lifted near mongo connection
/** lift me too...
  Note
  .find({})
  .then(result => {
    console.log('find all notes');
    nos=result
    notes =result.map(formatNote);
    mongoose.connection.close();
    console.log("nos",nos);
    console.log("notes",notes);
  });
 */

/** person info via mongoose 
  const Person = mongoose.model('Person', {
    name: String,
    phonenumber: String
  });
  const formatPerson = (person) => {
    return {
      name: person.name,
      phonenumber: person.name,
      id: person._id
    };
  };
*/
//const Person = require('./models/persons');  // lifted near mongo connection, see abover

/** Lift me too 
  Person
  .find({})
  .then(result => {
    console.log('find all persons');
    pers=result
    persons =result.map(formatPerson);
    mongoose.connection.close();
    console.log("pers",pers);
    console.log("persons",persons);
  });
 */
};
//FIXME hw3.11 - add static files support for build directory e.g. fetching the index.js frontend stuff from there

//console.log('2 why me notes:',notes); 


app.use(express.static('build'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
    console.log('app.get /');
});

app.get('/info', (req, res) => {
    // Use of Date.now() function 
    var dn = Date(Date.now()); 
    
    // Converting the number of millisecond in date string 
    requestDt = dn.toString();
  

    // Printing the current date      
    if (usemongoose==="NO") {               
      personsCnt = persons.length;
      notesCnt = notes.length;
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
    } else {
      personsCnt = persons.length;
      notesCnt = notes.length;
      res.send('We are furiously working to get the info right for mongodb'
              +'<br>PhoneBook has '
              +personsCnt
              +' persons'
              +'<br>'
              +requestDt
              +'<br>'
              +'/api/notes '
              +notesCnt
              +'<br>'
              +'/api/persons '
              +personsCnt);
    };
    //FIXME add counts baked from mongodb
});
  //http://localhost:3001/info

if (usemongoose==="NO") {                // we want to run this backend on top of selfmade json access
app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log('app.get /api/notes',notes);

});

app.get('/api/persons', (req, res) => {
    res.json(persons);
    console.log('app.get /api/persons',persons);
});

//console.log('why me notes:',notes); 
const eti=notes.find(note=>note.id===2);            // this wont bomb, if doesnt exist
console.log("notes.find(note=>note.id===2)",eti);

//http://localhost:3001/notes/1
app.get('/api/notes/:id', (request, response) => {
      //const id = request.params.id;
      const id = Number(request.params.id);
      console.log('app.get /api/notes/:id',id);
      console.log(notes.map(note => note.id));
      //const note = notes.find(note => note.id === id);
      const note = notes.find(note => {
        console.log('app.get',note.id, typeof note.id, id, typeof id, note.id === id);
        return note.id === id;
      });
      console.log('app.get /api/notes/:id',note);
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
  console.log('app.get /api/persons/:id',person);
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

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log('app.delete /api/notes/:id',id);
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
  app.post('/api/notes', (request, response) => {
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
    console.log('app.post /api/notes',note);
    response.json(note);
  });

  //http://localhost:3001/api/persons
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  app.post('/api/persons', (request, response) => {
    console.log('app.post /api/person');
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
        console.log('app.post /api/person duplicate error',duplicate);      
        return response.status(400).json({error: 'name must be unique'});
      };
    };
  });
} else if (usemongoose==="YES") {       // we want to run this backend on top of mongodb
  //FIXME mongodb code here - hmm l,ets lift up, they wont work here :)

  

};
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

  if (usemongoose==="NO") {
  repl.start('> ').context.notes = notes;
  };

//console.log(request.headers)
