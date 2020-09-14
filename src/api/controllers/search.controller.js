const httpStatus = require('http-status');
const { omit } = require('lodash');
var assert = require('assert');
const Customer = require('../models/customer.model');
const { handler: errorHandler } = require('../middlewares/error');


/**
 * Search contact of customer
 * @public
 */

exports.search = async (req, res, next) => {
    const query = req.query.q
    await Customer.find(function (err, data) {
            res.json(data);
        });
  }

  /*
        {$or: 
            [
                {name:{$regex: new RegExp(query)}},
                {email:{$regex: new RegExp(query)}},
                {phone: {$regex: new RegExp(query)}}
            ]
        },
        {
            _id:0,
            __v:0
        }, 
  */