'use strict';

var Promise = require('es6-promise').Promise;
var request = require('request');
var OAuth = require('oauth-1.0a');

function setupOauth() {
  var promise = new Promise(function(resolve, reject) {
    
    // OAuth Version 1.0a
    var oauth = OAuth({
        consumer: {
            public: 'foo', // REPLACE WITH YOUR CONSUMER KEY
            secret: 'bar' // REPLACE WITH YOUR CONSUMER SECRET
        },
        signature_method: 'HMAC-SHA1'
    });

    if (oauth) resolve(oauth);
    else reject(error);
  });

  return promise;
};


function getAuthHeader(oauth) {
  var request_data = {
      url: 'https://marketplace-dev.allizom.org/oauth/token',
      method: 'POST'
  };

  var promise = new Promise(function(resolve, reject) {
    var signedReq = oauth.authorize(request_data);
    var authHeader = oauth.toHeader(signedReq);

    console.log("SIGNED REQ: ", signedReq);
    console.log("Authorization Header: ", authHeader);

    if (authHeader) resolve(authHeader);
    else reject(error);
  });

  return promise;
};

function createApplication(authHeader) {
  var options = {
    uri: 'https://marketplace-dev.allizom.org/api/v2/apps/app',
    method: 'POST',
    formData: { 'manifest': '31668ee4ba3d44fe97da4532f56b85a7' }, // Manifest ID references valid manifest here: brittanystoroz.github.io/its-five-o-clock-somewhere/manifest.webapp
    headers: {
      'Content-type': 'application/json',
      'Authorization': authHeader.Authorization
    }
  }

  var promise = new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {    
      if (error) reject(error);
      else resolve(response);    
    });
  });

  return promise;
}


function authAndPub() {
  setupOauth().then(getAuthHeader).then(createApplication).then(function(response) {
    console.log("Response: ", response.req);
  });
}



module.exports = authAndPub();
