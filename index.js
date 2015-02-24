'use strict';

var Promise = require('es6-promise').Promise;
var request = require('request');
var OAuth = require('oauth-1.0a');


var oauth = OAuth({
    consumer: {
        public: 'foo', // REPLACE WITH YOUR CONSUMER KEY
        secret: 'bar' // REPLACE WITH YOUR CONSUMER SECRET
    },
    signature_method: 'HMAC-SHA1'
});

function getAuthHeader(oauth) {
  var requestData = {
    url: 'https://marketplace-dev.allizom.org/api/v2/apps/app',
    method: 'POST'
  }

  var promise = new Promise(function(resolve, reject) {
    var signedReq = oauth.authorize(requestData);
    var authHeader = oauth.toHeader(signedReq);

    console.log("Authorization Header: ", authHeader);

    if (authHeader) resolve(authHeader);
    else reject(error);
  });

  return promise;
};

function createApplication(authHeader) {
    request.post({ 
      url: 'https://marketplace-dev.allizom.org/api/v2/apps/app',
      oauth: authHeader,
      data: { 'manifest': '725934254a73481b94cc6535e67c2412'}
    }, function(e, r, body) {
      console.log("ERR: ", e);
      console.log("R: ", r.statusCode);
      console.log("BODY: ", body);
    });
}

module.exports = getAuthHeader(oauth).then(createApplication);
