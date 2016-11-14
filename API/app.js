// Our API goes here!
var http = require('http');
var express = require('express')
var app = express();
const HTTPError = require('node-http-error');
const port = process.env.PORT || 4000;
//const dal = dalNoSQL == 'nosql' ? require('../DAL/no-sql.js') : require('../DAL/no-sql.js');
const dal = require('../DAL/no-sql.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var jsonParser = bodyParser.json();

//////////////////person//////////////////////////

app.get('/person/:id', function(req, res, next) {
    const personID = req.params.id
    console.log(personID)

    dal.getPerson(personID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));

        }
        if (data) {
            //      console.log('GET' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(200).send({data});
        }
    })
})

app.put('/person/:id', function(req, res, next) {
    console.log(req.body);

    dal.updatePerson(req.body, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('PUT' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})

app.post('/person', function(req, res, next) {
    console.log(req.body);

    dal.createPerson(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('POST' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})
app.delete('/person/:id', function(req, res, next) {
    const personID = req.params.id;
    dal.getPerson(personID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            dal.deletePerson(data, function callback(deletederr, deleteddata) {
                if (deletederr) {
                    var responseError = BuildResponseError(err);
                    return next(new HTTPError(responseError.status, responseError.message, responseError));
                }
                if (deleteddata) {
                    console.log('DELETE' + req.path, deleteddata)
                    res.append('Content-type', 'application/json');
                    res.status(201).send(deleteddata);
                }
            })
        }
    })
})

app.get('/person', function(req, res, next){
  const sortByParam = req.query.sortBy || 'lastName';
  const sortBy = getPersonSortBy(sortByParam, 'nosql')
  const sortToken = req.query.sortToken || " ";
  const limit = req.query.limit || 5;

  dal.listPersons(sortBy, sortToken, limit, function callback(err, data) {
    if(err){
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
        console.log('GET' + req.path, "query:", req.query, data)
        res.append('Content-type', 'application/json');
        res.status(201).send(data);
    }
  })
})


//////////////reliefEfforts//////////////////////

app.get('/reliefEfforts/:id', function(req, res, next) {
    const reliefEffortID = req.params.id
    console.log(reliefEffortID)

    dal.getReliefEffort(reliefEffortID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));

        }
        if (data) {
            //      console.log('GET' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(200).send({data});
        }
    })
})

app.post('/reliefEfforts', function(req, res, next) {
    console.log(req.body);

    dal.createReliefEffort(req.body, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('POST' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})
app.put('/reliefEfforts/:id', function(req, res, next) {
    console.log(req.body);

    dal.updateReliefEffort(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('PUT' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})

app.delete('/reliefEfforts/:id', function(req, res, next) {
    const reliefEffortID = req.params.id;
    dal.getReliefEffort(reliefEffortID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            dal.deleteReliefEffort(data, function callback(deletederr, deleteddata) {
                if (deletederr) {
                    var responseError = BuildResponseError(deletederr);
                    return next(new HTTPError(responseError.status, responseError.message, responseError));
                }
                if (deleteddata) {
                    console.log('DELETE' + req.path, deleteddata)
                    res.append('Content-type', 'application/json');
                    res.status(201).send(deleteddata);
                }
            })
        }
    })
})
app.get('/reliefEfforts', function(req, res, next){
  const sortByParam = req.query.sortBy || 'reliefEfforts';
  const sortBy = getReliefEffortSortBy(sortByParam, 'nosql')
  const sortToken = req.query.sortToken || "";
  const limit = req.query.limit || 5;

  dal.listReliefEfforts(sortBy, sortToken, limit, function callback(err, data) {
    if(err){
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
        console.log('GET' + req.path, "query:", req.query, data)
        res.append('Content-type', 'application/json');
        res.status(201).send(data);
    }
  })
})



function BuildResponseError(err) {

    // no sql error message example
    //     { id: 'person_jackiekennedyo1922@gmail.org',
    // error: 'conflict',
    // reason: 'Document update conflict.',
    // name: 'conflict',
    // status: 409,
    // message: 'Document update conflict.',
    // ok: true }
    //
    // // custom DAL validation message example
    //
    // {
    // error: 'Bad Request',
    // reason: 'Unnecessary _id property within data.'
    // name: 'Bad Request',
    // status: 400,
    // message: 'Unnecessary _id property within data.',
    // ok: true }

    // if the first three characters are a number then return the error code otherwise
    //  default to 400 (bad request)
    const statuscheck = isNaN(err.message.substring(0, 3)) === true
        ? "400"
        : err.message.substring(0, 3)
    const status = err.status
        ? Number(err.status)
        : Number(statuscheck)
    const message = err.status
        ? err.message
        : err.message.substring(3)
    const reason = message
    const error = status === 400
        ? "Bad Request"
        : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message

    //   { error: 'Bad Request',
    // reason: 'Missing email property within data',
    // name: 'Bad Request',
    // status: 400,
    // message: 'Missing email property within data' }
    //console.log("BuildResponseError-->", errormsg)
    return errormsg
}
function getPersonSortBy(type, dalModule) {
    var sortBy;
    var options = {
        'lastname': function() {
            sortBy = dalModule === 'nosql' ? 'lastNameView' : 'vPerson';
        },
        'email': function() {
            //email
            sortBy = dalModule === 'nosql' ? 'emailView' : 'vPersonEmail';
        },
        'default': function() {
            sortBy = dalModule === 'nosql' ? 'lastNameView' : 'vPerson';
        }
    };
    // invoke it
    (options[type] || options['default'])();
    // return a String with chosen sort
    return sortBy;
}
function getReliefEffortSortBy(type, dalModule) {
    var sortBy;
    var options = {
        'reliefEfforts': function() {
            sortBy = dalModule === 'nosql' ? 'reliefEffortsView' : 'vreliefEfforts';
        },
        'reliefEffortsPhaseName': function() {
            //email
            sortBy = dalModule === 'nosql' ? 'reliefEffortsPhaseName' : 'vreliefEffortsPhaseName';
        },
        'default': function() {
            sortBy = dalModule === 'nosql' ? 'reliefEffortsView' : 'vreliefEfforts';
        }
    };
    // invoke it
    (options[type] || options['default'])();
    // return a String with chosen sort
    return sortBy;
}




app.use(function(err, req, res, next) {
    console.log('error handler')
    console.log(req.method, ' ', req.path, " err: ", err)
    res.status(err.status || 400);
    res.send(err)
});

app.listen(4000, function() {
    console.log('Example app listening on port 4000!');
})
