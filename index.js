const mongoose = require('mongoose');
// print process.argv
if ( process.env.NODE_ENV !== 'production' ) { //HW3.21* if not production then use .env and dev mongodb in mlab
  require('dotenv').config();
};


// lesson learned about 'initializing' these, if they are initialized inside if {} you get easily hurted :)
let mongouser = null;
let mongopassu = null;
let mlabdburl = null;
let usemongoose = null;
let nos = null;
let pers = null;
let notes = null;
let persons = null;
let newurl = null;
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

//const url = process.env.MONGODB_URI

if (process.argv.length===5 || process.env.MONGODB_URI.length>0) {
//  if (mlabdburl.length>0 || process.env.MONGODB_URI.length>0) {
    console.log("We are going to use mongoose!");
    if (process.env.MONGODB_URI.length>0) {
      newurl=process.env.MONGODB_URI;
    } else {
      newurl = 'mongodb://'.concat(mongouser).concat(':').concat(mongopassu).concat('@').concat(mlabdburl); 
      console.log(mongouser,mongopassu,mlabdburl);
      console.log(mlabdburl.length);
    };
    let url=newurl;
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
//      console.log("nos",nos);
//      console.log("notes",notes);
    });
    const modelspersons = require('./models/person');
    console.log('require ./models/persons');

    modelspersons.Person
    .find({})
    .then(result => {
      console.log('find all persons');
      pers=result
      persons =result.map(modelspersons.formatPerson);
//      console.log("pers",pers);
//      console.log("persons",persons);
    });

    app.get('/api/persons', (request, response) => {
      modelspersons.Person
      .find({}, {__v: 0})
      .then(persons => {
        console.log('/api/persons');
        if (persons) {
          pers=persons;
          persf =persons.map(modelspersons.formatPerson);
          console.log("pers",pers);
          console.log("persons",persf);
          response.json(persons.map(modelspersons.formatPerson));
          } else {
            response.status(404).end(); // request ok format, but not found = 404 !!!
          }
        })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'something went royally wrong in your request' });  // bad request
      });
    }); // app.get('api/persons'

    app.get('/api/persons/:id', (request, response) => {
      modelspersons.Person
        .findById(request.params.id)
        .then(person => {
          if (person) {
            response.json(modelspersons.formatPerson(person));
          } else {
            response.status(404).end();         // request ok format, but id not found = 404 !!!
          };
        })
        .catch(error => {
          response.status(400).send({ error: 'malformatted id' });  // bad request
        })
    }); //app.get('/api/person/:id'

    app.post('/api/persons', (request, response) => {
      const body = request.body;
    
      if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'});
      };
      console.log('body.name:',body.name);
      let nameToBeAdded = body.name;
      //https://stackoverflow.com/questions/9660587/do-something-if-nothing-found-with-find-mongoose
      modelspersons.Person
      .find({name: body.name}) //body.name})  "Arto Vihavainen"
      .then(result => {
        if (!result.length) {// this is wanted position, lets add
          console.log('result',result);
          console.log('we didnt find duplicate in mongodb');
          const person = new modelspersons.Person({
            name: body.name,
            phonenumber: body.phonenumber,
          });
          person                  //FIXME promise chain v2 for person post
          .save()
          .then(modelspersons.formatPerson) 
          .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
          })
          .catch(error => {
            //console.log(error)
            response.status(400).send({ error: 'something went royally wrong with your post' });  // bad request
          });
        } else { 
          console.log('post person conflict error 409, name exists already',body.name);
          console.log('result',result);
          response.status(409).send({ error: 'conflict error 409, name exists already'}); // request is conflict error 409, name exists
        };
      })
      .catch(error => {
        response.status(400).send({ error: 'problem in post person ' });  // bad request
      });


/**     person
        .save()
        .then(savedPerson => {
          response.json(modelspersons.formatPerson(savedPerson));
        })
        .catch(error => {
          console.log(error)
          response.status(400).send({ error: 'something went royally wrong with your post' });  // bad request
        });
    */
  

    }); //app.post('/api/person'
    app.delete('/api/persons/:id', (request, response) => {
      console.log('app.delete /api/persons/:id',request.params.id);
      mongoose.set('useFindAndModify', false);
      modelspersons.Person
        .findByIdAndRemove(request.params.id)
//        .findOneAndRemove({ _id: request.params.id })
        .then(result => {
          response.status(204).end(); //no content
        })
        .catch(error => {
          console.log(error);
          response.status(400).send({ error: 'malformatted id' })
        })
    }); //app.delete('/api/persons/:id

/**
 * const updatepromised = (id, newObject) => {
    const request=axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
};
 */
app.put('/api/persons/:id', (request, response) => {
  console.log('app.put /api/persons request.params.id', request.params.id);
  const body = request.body;
  console.log('app.put body.name:',body.name);
  console.log('app.put body.phonenumber:',body.phonenumber);
    
  if (body.name === undefined) {
    return response.status(400).json({error: 'name missing'});
  };

  modelspersons.Person  
  .findByIdAndUpdate(request.params.id,
    { $set: { phonenumber: body.phonenumber}},
    {new: true},
    function (err,person)
    {if (err) return response.status(400).send({ error: 'something went royally wrong with your put' });
    response.send(person);
  });
}); //app.put('/api/persons/:id'


    app.get('/api/notes', (request, response) => {
  
      modelsnote.Note
        .find({}, {__v: 0})
        .then(notes => {
          if (notes) {
            response.json(notes.map(modelsnote.formatNote));
            } else {
            response.status(404).end();         // request ok format, but not found = 404 !!!
            };
         })
        .catch(error => {
          //console.log(error)
          response.status(400).send({ error: 'something went royally wrong in your request' });  // bad request
        });

    }); //app.get('/api/notes'

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
      note                  //FIXME promise chain v2
      .save()
      .then(modelsnote.formatNote)
      .then(savedAndFormattedNote => {
        response.json(savedAndFormattedNote)
      })
      .catch(error => {
        //console.log(error)
        response.status(400).send({ error: 'something went royally wrong with your post' });  // bad request
      });
    }); //app.post('/api/notes'

app.put('/api/notes/:id', (request, response) => {
  console.log('app.put request.params.id', request.params.id);
  const body = request.body;
  console.log('app.put body.content:',body.content);
  console.log('app.put body.important:',body.important);
    
  if (body.content === undefined) {
    return response.status(400).json({error: 'content missing'});
  };
  modelsnote.Note
  .findByIdAndUpdate(request.params.id,
    { $set: { important: body.important}},
    {new: true},
    function (err,note)
    {if (err) return response.status(400).send({ error: 'something went royally wrong with your put' });
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
}); //app.put('/api/notes/:id'



    app.get('/api/notes/:id', (request, response) => {
      modelsnote.Note
        .findById(request.params.id)
        .then(note => {
          if (note) {
            response.json(modelsnote.formatNote(note));
          } else {
            response.status(404).end();         // request ok format, but id not found = 404 !!!
          };
        })
        .catch(error => {
          response.status(400).send({ error: 'malformatted id' });  // bad request
        });
    }); //app.get('/api/notes/:id'
    app.delete('/api/notes/:id', (request, response) => {
      console.log('app.delete /api/notes/:id',request.params.id);
      mongoose.set('useFindAndModify', false);
      modelsnote.Note
        .findByIdAndRemove(request.params.id)
//        .findOneAndRemove({ _id: request.params.id })
        .then(result => {
          response.status(204).end(); //no content
        })
        .catch(error => {
          console.log(error);
          response.status(400).send({ error: 'malformatted id' })
        })
    }); //app.delete('/api/notes/:id
    
    
  //} 
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
    //mongoose.connection.close();
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
    //mongoose.connection.close();
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
