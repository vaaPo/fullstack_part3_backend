//FIXME in index.js const Note = require('./models/persons')
//https://stackoverflow.com/questions/13857203/cant-get-data-from-database-after-multiple-schema-declared-mongoose-express

const mongoose = require('mongoose');

//const url = 'mongodb://fullstack:sekred@ds211088.mlab.com:11088/fullstack-notes';
//mongoose.connect(url);

const Person = mongoose.model('Person', {
  name: String,
  phonenumber: String
});
const formatPerson = (person) => {
  return {
    name: person.name,
    phonenumber: person.phonenumber,
    id: person._id
  };
};
module.exports = {
  Person: Person,
  formatPerson: formatPerson
};
/**
 * var modelsperson = require('./models/person');
...
modelsperson.Person.findOne(...
 */

/** GENERIC formatNote
  const formatPerson = (person) => {
  const formattedPerson = { ...person._doc, id: person._id }
  delete formattedPerson._id
  delete formattedPerson.__v

  return formattedPerson
};

 */

//module.exports = Person;