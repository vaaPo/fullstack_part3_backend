const mongoose = require('mongoose');
// print process.argv
let mongouser=null;
let mongopassu=null;
let mlabdburl=null;
let newpersonname=null;
let newphonenumber=null;
//./mongotrials/monghw3.12.sh

//console.log('process.argv.lastIndexOf',process.argv.lastIndexOf);
console.log('process.argv.length',process.argv.length);

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
    if (index===2) { mongouser=val;};
    if (index===3) { mongopassu=val;};
    if (index===4) { mlabdburl=val;};
    if (index===5) { newpersonname=val;};
    if (index===6) { newphonenumber=val;};
  });
  let url = 'mongodb://'.concat(mongouser).concat(':').concat(mongopassu).concat('@').concat(mlabdburl); 
  console.log (mongouser,mongopassu,mlabdburl);
  console.log(url);

  mongoose.connect(url);

  const Person = mongoose.model('Person', {
    name: String,
    phonenumber: String
  });
  
  if (process.argv.length===7) {
  const person = new Person({
    name: newpersonname,
    phonenumber: newphonenumber
  });

  person
    .save()
    .then(response => {
        console.log('lisätään henkilö ',newpersonname,'numero',newphonenumber,'luetteloon');
        mongoose.connection.close();
  });
  } else {
    Person
    .find({})
    .then(result => {
      console.log('puhelinluettelo');
      result.forEach(person => {
        console.log(person.name,person.phonenumber);
      });
      mongoose.connection.close();
    });
  };


