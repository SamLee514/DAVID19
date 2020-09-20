// var express = require('express');
// var router = express.Router();

// router.get('/', function(req, res, next) {
//     res.send('API is working properly');
// });

// module.exports = router;

var Cloudant = require('@cloudant/cloudant')
var express = require('express');
var router = express.Router();


var cloudant = new Cloudant({ url: 'https://91a4a244-2758-4011-9e62-c11817074ca5-bluemix.cloudantnosqldb.appdomain.cloud/', plugins: { iamauth: { iamApiKey: '5QulfkQHwctHPNKddeeGeqA8tnHm-oAhCTI-M_pWvtu4' } } });

const db = cloudant.use('text');
console.log(db);
let myData = null;
db.list({include_docs:true}, function (err, data) {
    // console.log(err, data);
    // TODO: There is definitely a better way to reverse-sort the db
    myData = data['rows'].reverse();
    console.log(myData);
});

// lol what is async
router.get('/', function(req, res, next) {
    res.send(myData);
});

module.exports = router;
  
  