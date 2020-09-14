const client = require('../utils/APIPayment'); 
const Customer = require('../models/customer.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Create natural user or customer
 * @public
 */
exports.create = async (req, res, next) => {
    const { email } = req.body;
    const requestBody = req.body;
    var customerUrl = 'https://api-sandbox.dwolla.com/customers?email='+email;

    //console.log(customer);
    client.auth.client()
      .then(function(appToken) {
        return appToken
                  .post('customers', requestBody)
                  .then(() => {
                    appToken
                      .get(customerUrl)
                      .then(res => res.body._embedded['customers'][0])
                      .then(data => {
                          const user = Customer.findOneAndUpdate(
                            { email : email },
                            {$set: {
                                  dwollaID: data.id
                                }
                            },
                            {upsert: true},
                            function(err,doc) {
                              if (err) { throw err; }
                              else { console.log("Updated"); }
                            }
                          );                      
                          console.log('customer:  '+ data.id+'  - '+ user +'  successful display')
                      });
                  })
      })
      .catch(function(error) {
        console.log(error);
      })  
}


/**
 * Get Dwolla customer info
 * @public
 */
exports.get = async (req, res, next) => {
  const customer = await Customer.findById(req.params.customerId);  
  
  var customerUrl = 'https://api-sandbox.dwolla.com/customers?email='+customer.email; //https://api.dwolla.com/customers?email=
  //console.log(customerUrl);

  client.auth.client()
    .then( (appToken) => {
        return  appToken
                .get(customerUrl)
                .then(res => res.body._embedded['customers'][0])
                .then(data => console.log('customer:  '+ data.firstName+'  successful display'));
    })
    .catch(function(error) {
      console.log(error);
    })
}

/**
 * update Dwolla customer info
 * @public
 */
exports.update = async (req, res, next) => {
  const requestBody = req.body;
  const customerUrl = 'https://api-sandbox.dwolla.com/customers/d7efa4d8-ee00-4aad-b1ac-95e5bab304b2';
  client.auth.client()
    .then( (appToken) => {
          appToken
            .post(customerUrl, requestBody)
            .then(res => res.body.firstName); // => '53863b11-1758-47c8-821f-00e6a126f97f'
    })
}

function getUserById(customer) {
  var customerUrl = 'https://api-sandbox.dwolla.com/customers?email='+customer.email; //https://api.dwolla.com/customers?email=
  var customerId;
  client.auth.client()
    .then( (appToken) => {
      return appToken
          .get(customerUrl)
          .then(res => res.body._embedded['customers'][0])
          .then(res => res.id)
          .then(data => { 
            customerId = data; console.log(customerId);
          });
    })
    //console.log(customerId);
    //return customerId;//d7efa4d8-ee00-4aad-b1ac-95e5bab304b2
}

/**
 * add Dwolla bank Account customer info
 * @public
 */
exports.addBankAccount = async (req, res, next) => {
  const requestBody = req.body;
  const customer = await Customer.findById(req.params.customerId);  
  var customerUrl = 'https://api-sandbox.dwolla.com/customers?email='+customer.email;
  
  client.auth.client()
    .then( (appToken) => {
        return  appToken
                .get(customerUrl)
                .then(res => {
                  const id = res.body._embedded['customers'][0].id;
                  var customerUrl = 'https://api-sandbox.dwolla.com/customers/'+id;
                  //console.log('customer:  '+ url +'  successful display')
                  appToken
                    .post(`${customerUrl}/iav-token`)
                    .then(res => res.body.token); //code source infini il faut recuperer le token à la vue            
                });
    })
    .catch(function(error) {
      console.log(error);
    })
}