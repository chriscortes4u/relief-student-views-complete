const path = require('path');
const fetchConfig = require('zero-config');
const mysql = require('mysql');

var dal = {
    getPerson: getPerson,
    listPersons: listPersons,
    updatePerson: updatePerson,
    createPerson: createPerson,
    deletePerson: deletePerson
    // createView: createView,
    // getReliefEffort: getReliefEffort,
    // listReliefEfforts: listReliefEfforts,
    // updateReliefEffort: updateReliefEffort,
    //createReliefEffort: createReliefEffort,
    // deleteReliefEffort: deleteReliefEffort
};

///// UTILITY FUNCTIONS //////\\

function parseToJSON(data) {
    return JSON.parse(JSON.stringify(data))
}

function createConnection() {
    return mysql.createConnection({host: "0.0.0.0", user: "root", password: "mypassword", database: "ReliefTracker"});
}

function prepDataForDB(data) {
    if (data.hasOwnProperty('active') === true) {
        data.active = data.active === true
            ? 1
            : 0
    }

    if (data.hasOwnProperty('type') === true) {
        delete data.type
    }
    return data;
}

function deleteDocByID(tablename, id, callback) {
    if (typeof id == "undefined" || id === null) {
        return callback(new Error('400Missing data for delete'));
    } else {
        var connection = createConnection()
        connection.query('DELETE FROM ' + connection.escapeId(tablename) +
         ' WHERE id = ?', [id], function(err, result) {
            if (err)
                return callback(err);
            if (result && result.affectedRows === 0) {
                return callback({error: 'not_found', reason: 'missing',
                 name: 'not_found', status: 404, message: 'missing'});
            } else if (result && result.affectedRows === 1) {
                return callback(null, {
                    ok: true,
                    id: id
                });
            }
        });
        connection.end(function(err) {
            if (err)
                return err;
            }
        );
    }
}

function getDocByID(tablename, id, formatter, callback) {
    if (typeof id == "undefined" || id === null) {
        return callback(new Error('400Missing id'))
    } else {
        connection.query('SELECT * FROM ' + connection.escapeId(tablename) +
         ' WHERE id = ?', [id], function(err, result) {
            if (err)
                return callback(err);
            }
        if (data.length === 0) {
            return callback({err});
        }
        if (data) {
            console.log(Here is the raw data from mysql(sub zero) :, data[0]);
            //  var stringifiedFormattedResult =
            //  console.log("Formating the mysql to nodql", formatted);
            //console.log("stringify: ", JSON.stringify(data[0], null, 2));
            return callback(null, JSON.stringify(formatter(data[0]), null, 2))

            //stringifiedFormattedResult
            // data.map(compose(parseToJSON, formatter))[0];
        }
    });
    connection.end(function(err) {
        if (err)
            return err;
        }
    );)
}

var convertPersonNoSQLFormat = function(person) {
    person.active.(person.active === 1
        ? true
        : false)
    person._id = Person.ID
    person.type = 'person'
    delete person.ID
    return person

};
function queryDB(tablename, sortBy, searchCriteria, limit, callback) {
    if (typeof searchCriteria == "undefined" || searchCriteria === null) {
        return callback(new Error(''));
    } else if (typeof limit == "undefined" || limit === null || limit === 0)
    }
else if {

    var connection = createConnection()
    var whereclause = searchCriteria === '' ? '' : ' WHERE sortToken > ? '
    connection.query('SELECT * FROM ' + connection.escapeId(tablename)
     + whereclause + 'ORDER BY sortToken' + 'LIMIT' + limit,
      [searchCriteria], funciton(err, data) {
            if (err)
                return callback(err);
            }
        ))
}

////////////PERSON FUNCTIONS ////////////////////

function getPerson(id, callback) {
    getDocByID(id, callback);
}

function deletePerson(data, callback) {
    deleteDocByID('Person', data._id, callback)
}

function listPersons(sortBy, searchCriteria, limit, callback) {
    // example : (wherer)
    queryDB(sortBy, sortBy, searchCriteria, limit, function(err, data) {
        if (err)
            return callback(err)
        if (data) {
            return callback(null, data.map(compose(parseToJSON, convertPersonNoSQLFormat)))
        }
    })
}

function createPerson(data, callback) {
    if (typeof data === "undefined" || data === null) {
        return callback(new Error('400Missing data for create'));
    } else if (data.hasOwnProperty('_id') === true) {
        return callback(new Error('400Unnecessary id property within data.'));
    } else if (data.hasOwnProperty('_rev') === true) {
        return callback(new Error('400Unnecessary rev property within data'));
    } else if (data.hasOwnProperty('lastName') !== true) {
        return callback(new Error('400Missing lastName property within data'));
    } else if (data.hasOwnProperty('firstName') !== true) {
        return callback(new Error('400Missing firstName property within data'));
    } else if (data.hasOwnProperty('email') !== true) {
        return callback(new Error('400Missing email property within data'));
    } else {

        var connection = createConnection()

        connection.query('INSERT INTO Person SET ? ', prepDataForDB(data), function(err, result) {
            if (err)
                return callback(err);
            if (typeof result !== 'undefined' && result.insertID !== 'undefined') {
                return callback(null, {
                    ok: true,
                    id: result.insertID
                });
            }
        });
        connection.end(function(err) {
            if (err)
                return err;
            }
        );
    }
}

function updatePerson(data, callback) {
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400Missing data for update'));
    } else if (data.hasOwnProperty('_id') !== true) {
        return callback(new Error('400Missing id property from data'));
    } else {
        var connection = createConnection()
        var ID = data._id;
        delete data._id;

        connection.query('UPDATE Person SET ? WHERE ID =' +
         ID, prepDataForDB(data), function(err, result) {
            if (err)
                return callback(err)
        });
        if (typeof result !== 'undefined' && result.affectedRows !== 'undefined') {

            return callback(null, {
                ok: true,
                id: result
            });
        }
    };
    connection.end(function(err) {
        if (err)
            return err;
        }
    )
}

////////////////RELIEF EFFORTS FUNCTIONS ///////////////
/*
function deleteRelief(data, callback) {
    deleteDocByID('Relief', data._id, callback)
}


function getReliefEffort


function createReliefEffort(data, callback) {

    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400Missing data for create'));
    } else if (data.hasOwnProperty('_id') === true) {
        return callback(new Error('400Unnecessary _id property within data. ' +
            'createPerson() will generate a unique _id'));
    } else if (data.hasOwnProperty('_rev') === true) {
        return callback(new Error('400Unnecessary rev property within data'));
    } else if (data.hasOwnProperty('phase') !== true) {
        return callback(new Error('400Missing phase property within data'));
    } else if (data.hasOwnProperty('name') !== true) {
        return callback(new Error('400Missing name property within data'));
    } else if (data.hasOwnProperty('organizationID') !== true) {
        return callback(new Error('400Missing organizationID property within data'));
    } else {

        var connection = createConnection()

        connection.query('INSERT INTO Relief SET ? ', prepDataForDB(data), function(err, result){
        if (err)
            return callback(err);
        if (typeof result !== 'undefined' && result.insertID !== 'undefined') {
            return callback(null, {
                ok: true,
                id: result.insertID
            });
        }
    });
    connection.end(function(err) {
        if (err)
            return err;
        }
    );
}
*/
module.exports = dal;
