// var express = require('express');
// var router = express.Router();

// router.get('/', function(req, res, next) {
//     res.send('API is working properly');
// });

// module.exports = router;

var Cloudant = require('@cloudant/cloudant')
var express = require('express');
var router = express.Router();
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


var cloudant = new Cloudant({ url: 'https://91a4a244-2758-4011-9e62-c11817074ca5-bluemix.cloudantnosqldb.appdomain.cloud/', plugins: { iamauth: { iamApiKey: '5QulfkQHwctHPNKddeeGeqA8tnHm-oAhCTI-M_pWvtu4' } } });

const db = cloudant.use('text');
console.log(db);
let myData = null;
db.list({include_docs:true}, function (err, data) {
    // console.log(err, data);
    // TODO: There is definitely a better way to reverse-sort the db
    myData = data['rows'].reverse();
    // console.log(myData);
});

// TODO: skipping the save to database part for now
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
      apikey: 'fSuVHHc31nzu5_ZpfqajZWyIxopdmkhZvAH-ugh6CEBd',
    }),
    serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/afb07e7f-3ccc-4466-8282-675a1d5e49d6/v1/analyze?version=2019-07-12',
  });
  
  const analyzeParams = {
    'text': 'What is coronavirus? It makes me sad. How about those masks, they are great. I am so hopeful about COVID',
    // TODO: Might need to revert this to targets
    'features': {
        "keywords": {
            "sentiment": true
          }
    }
  };
  
  let nluResults = 0;
  naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        const keywords = analysisResults.result.keywords
        console.log(keywords)
        for (let i = 0; i < keywords.length; i++) {
            nluResults += keywords[i].sentiment.score;
        }
        console.log('LENGTH', keywords.length)
        console.log('SUM', nluResults)
        nluResults /= keywords.length;
        console.log(nluResults);
    })
    .catch(err => {
      console.log('error:', err);
    });

// lol what is async
router.get('/', function(req, res, next) {
    res.send(String(nluResults));
});

module.exports = router;
//////////////////////////////////
  