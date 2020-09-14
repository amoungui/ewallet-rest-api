const dwolla = require('dwolla-v2');

// Navigate to https://dashboard.dwolla.com/applications (production) or https://dashboard-sandbox.dwolla.com/applications (Sandbox) for your application key and secret.
const appKey = 'i8vrKKA38sql9yujbBDHy5vBbZXgDKpt5PMPg89Ez4zJg6ClZr';
const appSecret = 'TBlV8vxMdUyURhdzp2DMDWP67y9a9dhT8dm1HUwDm2GCjFQrla';
const client = new dwolla.Client({
  key: appKey,
  secret: appSecret,
  environment: 'sandbox' // optional - defaults to production
});


// Using DwollaV2 - https://github.com/Dwolla/dwolla-v2-node
// This example assumes you've already initialized the client. Reference the SDKs page for more information: https://developers.dwolla.com/pages/sdks.html

/*
var requestBody = {
  url: 'http://myawesomeapplication.com/destination',
  secret: 'your webhook secret'
};

client.auth.client()
  .then(function(appToken) {
    return appToken.get('webhook-subscriptions');
  })
  .then(function(res) {
    console.log(JSON.stringify(res.body));
  });

client.auth.client()
  .then(function(appToken) {
    return appToken
            .post('webhook-subscriptions', requestBody)
            .then(res => res.headers.get('location'));
  })
  .then(function(res) {
    console.log(res);
  });
*/

module.exports = client;