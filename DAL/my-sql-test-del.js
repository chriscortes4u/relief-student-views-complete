//todo data validation: check incoming data and ensure nothing is missing or not needed
//todo change the data before the query is to the database is run.  - remove typekey in json
//todo create connetion to mysql
//todo query the database by performing a sql Insert into statement
//todo change the json from mysql to the spec for our app.
//todo call the callback tell the api the were are done.
// -- goodness or badness (err, result)
//todo  terminate the Connection on mysql.


const dal =require('./my-sql.js')

  const data = {
    _id: 13,
    firstName: "Jiffy",
    lastName: "Mixxen",
    phone: "626-758-4498",
    email: "JiffyMixxenJr@gmail.com",
    type: "person",
    active: true
}


function callback(err, result){
  if (err){
return  console.log ("shit", err)
  }
  console.log ("shit", result)
}

dal.deletePerson(data, callback)

console.log(dal);





////////////
