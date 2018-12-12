const modelsuser = require('../models/user'); //User

// ...

const usersInDb = async () => {
  const users = await modelsuser.User.find({});
  return users;
};

 

module.exports = { usersInDb };
//  initialNotes, format, nonExistingId, notesInDb, usersInDb
//};
