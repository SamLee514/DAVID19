var Cloudant = require('@cloudant/cloudant')

var cloudant = new Cloudant({ url: 'https://examples.cloudant.com', plugins: { iamauth: { iamApiKey: '5QulfkQHwctHPNKddeeGeqA8tnHm-oAhCTI-M_pWvtu4' } } });

// cloudant.db.list(function(err, body) {
//     body.forEach(function(db) {
//         console.log(db);
//     });
// });

var createDocument = function(callback) {
    console.log("Creating document 'mydoc'");
    // specify the id of the document so you can update and delete it later
    db.insert({ _id: 'mydoc', a: 1, b: 'two' }, function(err, data) {
        console.log('Error:', err);
        console.log('Data:', data);
        callback(err, data);
    });
};

var readDocument = function(callback) {
    console.log("Reading document 'mydoc'");
    db.get('mydoc', function(err, data) {
        console.log('Error:', err);
        console.log('Data:', data);
        // keep a copy of the doc so you know its revision token
        doc = data;
        callback(err, data);
    });
};

var updateDocument = function(callback) {
    console.log("Updating document 'mydoc'");
    // make a change to the document, using the copy we kept from reading it back
    doc.c = true;
    db.insert(doc, function(err, data) {
        console.log('Error:', err);
        console.log('Data:', data);
        // keep the revision of the update so we can delete it
        doc._rev = data.rev;
        callback(err, data);
    });
};

var deleteDocument = function(callback) {
    console.log("Deleting document 'mydoc'");
    // supply the id and revision to be deleted
    db.destroy(doc._id, doc._rev, function(err, data) {
        console.log('Error:', err);
        console.log('Data:', data);
        callback(err, data);
    });
};
  
  