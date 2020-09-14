/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
const httpStatus = require('http-status');
const { omit } = require('lodash');
var assert = require('assert');
const Customer = require('../models/customer.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Create new contact of customer
 * @public
 */
exports.listAllContactOfCustomer = async (req, res, next) => {
  const customer = await Customer.findById(req.params.customerId);
  const contactsOfCustumer = customer.populate("image", "contacts");
  res.json(contactsOfCustumer['contacts']); //or if you want to return an object replace with: contactsOfCustumer
}

/**
 * Search contact of customer
 * @public
 */

exports.get = async (req, res, next) => {
  const data = req.params.data;
  try {
    const customers = await Customer.find({ $or: [ { name: data }, { email: data }, { phone: data } ]});
    const arrayCustomers = customers.map(customer => customer.transform());
    res.json(arrayCustomers);
  } catch (error) {
    next(error);
  }    
}

/**
 * Get customer list
 * @public
 */
/*exports.list = async (req, res, next) => {
  try {
    const customers = await Customer.list(req.query);
    const transformedCustomers = customers.map(customer => customer.transform());
    res.json(transformedCustomers);
  } catch (error) {
    next(error);
  }
};*/

/**
 * Create new contact of customer
 * @public
 */
exports.create = async (req, res, next) => {
  const { phone } = req.body;
  const customerId  = req.params.customerId;
  const contact = await Customer.find({ phone });
  /*const customer = await Customer.findById(customerId);*/
  console.log('phone:', phone,'contact:', contact, 'id:', customerId);

  Customer.findByIdAndUpdate(    
    customerId,
    {
      $push: {
        contacts: contact,
      },
    },
    { new: true, useFindAndModify: false })
    .then((customer)=>{
      res.json(customer.transform());
    }, );
};

/**
 * Delete contact in the contact list of customer
 * @public
 */
exports.remove = async (req, res, next) => {
  const { contactId } = req.body;
  const id = req.params.customerId;
  const contact = await Customer.findById(contactId);
  var customer = await Customer.findById(id).populate("image", "contacts");
  let i= 0;
  var listes = customer.contacts;
  for (var liste of listes) {
    if(JSON.stringify(liste) === JSON.stringify(contact)){
      var removed = listes.splice(i,1);
    }
    i++;      
  }
  if(removed){
    customer.save();
    res.json("contact deleted!")
  }
};
