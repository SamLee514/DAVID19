const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: 'fSuVHHc31nzu5_ZpfqajZWyIxopdmkhZvAH-ugh6CEBd',
  }),
  serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/afb07e7f-3ccc-4466-8282-675a1d5e49d6/v1/analyze?version=2019-07-12',
});

const analyzeParams = {
  'text': 'I HATE CORONAVIRUS!!!! I love masks!!! This is so terrible!!',
  'features': {
    'sentiment': {
      'targets': [
        'COVID19',
        'coronavirus',
        'masks',
        'quarantine'
      ]
    }
  }
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });