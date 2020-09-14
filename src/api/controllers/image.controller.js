const httpStatus = require('http-status');
const { omit } = require('lodash');
var assert = require('assert');
const Customer = require('../models/customer.model');
const Image = require('../models/image.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * get image of customer
 * @public
 */
exports.get = async (req, res, next) => {
    const id = req.params.customerId;
    const customer = await Customer.findById(id).populate("image");
    return res.json(customer);
}

/**
 * update image of customer
 * @public
 */
exports.upload = async (req, res, next) => {
    const customerId = req.params.customerId;
    const  url = req.file.filename;
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
          success: false
        });
      } else {
        var image = new Image({
            url: url,
        });         
        image.save();
        var customer = await Customer.findById(customerId);
        customer.image = image;
        customer.save();
        console.log('File is available!');
        return res.json({
          success: "success"
        })
    }
};

/**
 * Delete image of customer
 * @public
 */
exports.remove = async (req, res, next) => {
    const id = req.params.customerId;
    const customer = await Customer.findById(id);
    const image = await Image.find({owner: customer.id});
  
    image.remove();

    console.log(image);
    
};
  