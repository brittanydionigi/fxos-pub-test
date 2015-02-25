'use strict';
 
var OAuth = require('oauth').OAuth;
 
var URLS = {
  validate: 'https://marketplace-dev.allizom.org/api/v2/apps/validation/',
  create: 'https://marketplace-dev.allizom.org/api/v2/apps/app/',
  myAccount: 'https://marketplace-dev.allizom.org/api/v2/account/settings/mine/'
};
 
var KEY = 'foo'; // Replace with your consumer key
var SECRET = 'bar'; // Replace with your consumer secret
 
var request = new OAuth(null, null, KEY, SECRET, '1.0', null, 'HMAC-SHA1');


// should display basic account information like display name but instead returning with
// "Authentication credentials were not provided." because we are not authenticated for some reason
request.get(URLS.myAccount, null, null, function(err, data) {
  console.log("My Account Details: ", data);
});

 
 // using an existing manifest to validate; you will still receive a 403 error but the detail
 // should be 'You do not own that app.' instead of 'You don't have permissions to perform that action.'
var body1 = {
  manifest: 'https://brittanystoroz.github.io/its-five-o-clock-somewhere/manifest.webapp'
};
 
request.post(URLS.validate, null, null, body1, function(err, data1) {
  console.log('Validated Manifest: ', JSON.parse(data1).id);
  var body2 = { manifest: JSON.parse(data1).id };
  request.post(URLS.create, null, null, body2, 'application/json', function(err, data2, oop) {
    console.log(oop.req._headers)
    console.log(data2);
  });
});
