
const dalNoSQL = require('./DAL/no-sql.js');

// person data. Use to test the createPerson() function within your DAL,
// Make INDIVIDUAL calls to the createPerson() function within your DAL
// with each person within the array.
const personData = [{
    firstName: "CheChe",
    lastName: "Martin",
    phone: "404 765-2279",
    email: "CheCheMartinJr@gmail.com",
    type: "person",
    active: true
},{
    firstName: "Wiz",
    lastName: "Jefferson",
    phone: "843 754-4904",
    email: "wiz@dentalone.com",
    type: "person",
    active: true
},{
    firstName: "Trip",
    lastName: "Johnston",
    phone: "843 542-2212",
    email: "Trip1111@gmail.com",
    type: "person",
    active: true
},{
    firstName: "Pual",
    lastName: "Johnson",
    phone: "843 653-6670",
    email: "pual.johnson1971@gmail.com",
    type: "person",
    active: true
},{
    firstName: "June",
    lastName: "Johnson",
    phone: "843 885-7835",
    email: "Johnson44@aol.com",
    type: "person",
    active: true
},{
    firstName: "Lokey",
    lastName: "Mixen",
    phone: "843 970-5438",
    email: "MixenL@gmail.com",
    type: "person",
    active: true
},{
    firstName: "Steve",
    lastName: "Madden",
    phone: "843 567-1515",
    email: "stevem@nyu.edu",
    type: "person",
    active: true
}]

function callback (msgHeader) {
  return function (err, response) {
    if (err) return console.log('ERROR:\n', err.message)
    return console.log(msgHeader, response)
  }
}

personData.forEach(function(person) {
  dalNoSQL.createPerson(person, callback('PERSON CREATED:\n'))
})
