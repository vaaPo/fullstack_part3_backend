const persons = [
    { id: 1,
      name: 'Arto Hellas',
      phonenumber: '+358 1234 567'
    },
    { id: 2, name: 'Martti Tienari', phonenumber: '040-123456' },
    { id: 3, name: 'Arto Järvinen', phonenumber: '040-123456' },
    { id: 4, name: 'Lea Kutvonen', phonenumber: '040-123456' }
  ];
console.log(persons);
console.log(persons[1].name);

//Filter array of objects, which property matches value, returns array:
var result = persons.filter(obj => {return obj.name === 'Arto Hellas'});
console.log(result);
const searchitpersons = persons.filter(obj => {return obj.name.toUpperCase() === 'ARTO HELLAS' });

console.log('searchitpersons',searchitpersons);
const searchitpersons2 = persons.filter(obj => {return obj.name.toUpperCase().includes('ARTO HELLAS') });

console.log('searchitpersons2',searchitpersons2);
const kala='AR';
const searchitpersons3 = persons.filter(obj => {return obj.name.toUpperCase().includes(kala) });

console.log('searchitpersons3',searchitpersons3);

export default persons;