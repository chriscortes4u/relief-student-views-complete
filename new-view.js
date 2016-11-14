const dalNoSQL = require('./DAL/no-sql.js');

var designDoc = {
    _id: '_design/reliefEffortsPhaseName',
    views: {
        'reliefEffortsPhaseName': {
            map: function(doc) {
                if (doc.type === 'relief') {
                    emit([
                        doc.phase, doc.name
                    ], {
                        "reliefName": doc.name,
                        "phase": doc.phase,
                        "startDate": doc.start,
                        "endDate": doc.end
                    });
                }
            }.toString()
        }
    }
}
dalNoSQL.createView(designDoc, function callback(err, data) {
    if (err)
        return console.log(err);
    if (data) {
        console.log(data);
    }
})
