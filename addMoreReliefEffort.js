
const dalNoSQL = require('./DAL/no-sql.js');

const reliefEffortData = [{
    "phase": "completed",
    "name": "Hurricane Mike 1985",
    "organizationID": "Hurricane Helpers",
    "desc": "Purricane Mike was a powerful Cape Verde-type hurricane that caused widespread damage and loss of life in the Leeward Islands, Puerto Rico, and the Southeast United States in 1989",
    "start": "1985-09-10",
    "end": "1985-09-25",
    "active": true
},
{
    "type": "relief",
    "phase": "completed",
    "name": "Peru 2014",
    "organizationID": "St. Phillips",
    "desc": "Build school desks and blackboards at the St. Esprit (Holy Spirit) church and school in the remote village of Gros Mangle in the island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.",
    "start": "2014-09-25",
    "end": "2015-10-01",
    "team": [{
        "name": "Steve Ananias",
        "role": "Team Leader",
        "personID": "person_stevean@duke.edu"
    }, {
        "name": "Libby Satterfield",
        "role": "Team member",
        "personID": "person_lsat1972@gmail.com"
    }, {
        "name": "Judy Jones",
        "role": "Team member",
        "personID": "person_judy5555@aol.com"
    }]
},
{
    "type": "relief",
    "phase": "planning",
    "name": " 2017",
    "organizationID": "St. Phillips",
    "desc": "Provide dental services, education, and supplies to the village of Gros Mangle on the island of La Gonave, Haiti.  Island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.The bulk of the mission work will take place at St.Esprit(Holy Spirit) church and school in the remote village of Gros Mangle, Haiti.The team will consist of team leaders, dentists, and dental hygienists.",
    "start": "2002-11-01",
    "end": "208-11-08",
    "team": [{
        "name": "Steven A. Smith",
        "role": "Team Leader",
        "personID": "person_stevensmith1001@gmail.com"
    }, {
        "name": "Tom Starfield",
        "role": "Team member",
        "personID": "person_tsat1982@gmail.com"
    }, {
        "name": "Jack Martin",
        "role": "Team member",
        "personID": "person_JackMartinJr@gmail.com"
    }]
},
{
    "phase": "completed",
    "name": "Cuba 2000",
    "organizationID": "St. Phillips",
    "desc": "Build school in Cuba",
    "start": "2000-01-05",
    "end": "2002-02-15"
},
{
    "type": "relief",
    "phase": "completed",
    "name": "Cuba 2000",
    "organizationID": "St. Phillips",
    "desc": "Build hospital in Cuba",
    "start": "2000-01-05",
    "end": "2001-02-15",
    "active": false
}
];


function callback (msgHeader) {
  return function (err, response) {
    if (err) return console.log('ERROR:\n', err.message)
    return console.log(msgHeader, response)
  }
}

reliefEffortData.forEach(function(reliefEffort, index) {
  dalNoSQL.createReliefEffort(reliefEffort, callback('RELIEF EFFORT CREATED:\n'))
})

//console.log(dalNoSQL.getDBInfo());
