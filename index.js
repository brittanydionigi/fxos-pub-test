'use strict';

var request = require('request');
 
var URLS = {
  validate: 'https://marketplace-dev.allizom.org/api/v2/apps/validation/',
  create: 'https://marketplace-dev.allizom.org/api/v2/apps/app/'
};
 
var KEY = 'foo'; // Replace with your consumer key
var SECRET = 'bar'; // Replace with your consumer secret

var manifestUrl = {
  manifest: 'https://brittanystoroz.github.io/its-five-o-clock-somewhere/manifest.webapp'  // Replace with your manifest.webapp url
};

function validateManifest() {
  request({
    url: URLS.validate,
    method: 'POST',
    body: manifestUrl,
    json: true,
    oauth: { "consumer_key": KEY, "consumer_secret": SECRET },
  }, function(error, response, body) {
    var validatedManifestId = body.id;
    console.log('Validated Manifest: ', validatedManifestId);
    submitApp(validatedManifestId)
  });
};

function submitApp(manifestID) {
    request({
      url: URLS.create + "?manifest=" + manifestID,
      method: 'POST',
      body: { "manifest": manifestID },
      json: true,
      oauth: { "consumer_key": KEY, "consumer_secret": SECRET },
    }, function(error, response, body) {
      console.log("App ID: ", body.id);
  });
};

validateManifest();

