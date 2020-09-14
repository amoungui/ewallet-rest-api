/* eslint-disable no-trailing-spaces */
/* eslint-disable space-before-blocks */
/* eslint-disable keyword-spacing */
/* eslint-disable consistent-return */
const httpStatus = require('http-status');
const Customer = require('../models/customer.model');
const RefreshToken = require('../models/refreshToken.model');
const moment = require('moment-timezone');
const { env, jwtExpirationInterval } = require('../../config/vars');
const { getResetRequest } = require('../models/resetRequests');
const sendResetLink = require('../controllers/sendEmailController');
// eslint-disable-next-line import/no-unresolved
const bcrypt = require('bcryptjs');
const { isEqualWith } = require('lodash');

/**
* Returns a formated object with tokens
* @private
*/
function generateTokenResponse(customer, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(customer).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType, accessToken, refreshToken, expiresIn,
  };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  try {
    if(isEqualWith(password, confirmPassword)){
      const customer = await (new Customer(req.body)).save();
      const customerTransformed = customer.transform();
      const token = generateTokenResponse(customer, customer.token());
      res.status(httpStatus.CREATED);
      return res.json({ token, customer: customerTransformed });  
    }
  } catch (error) {
    return res.status(400).json({ error: Customer.checkDuplicateEmail(error) });
  }
};

/**
 * Returns jwt token if valid email and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const { customer, accessToken } = await Customer.findAndGenerateToken(req.body);
    const token = generateTokenResponse(customer, accessToken);
    const customerTransformed = customer.transform();
    return res.json({ token, customer: customerTransformed });
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      customerEmail: email,
      token: refreshToken,
    });
    const { customer, accessToken } = await Customer.findAndGenerateToken({ email, refreshObject });
    const response = generateTokenResponse(customer, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

/**
 * 
 * @public
 */
exports.forgot = (req, res, next) => {
  const { email } = req.body;
  Customer.findOne({ email }).then((response) => {
    if(response){
      sendResetLink(response.email, response.id);      
    }
  }).catch(() => {
    res.status(400).json({ error: 'user with this email do not exist' });
  });
};

/**
 * 
 * @public
 */
exports.reset = async (req, res, next) => {
  const thisRequest = getResetRequest(req.body.id);
  if (thisRequest) {
    const user = await Customer.find({ email: thisRequest.email });
    const rounds = env === 'test' ? 1 : 10;

    bcrypt.hash(req.body.password, rounds).then((hashed) => {
      user.password = hashed;
      user.save();
      res.status(204).json();
    });
  } else {
    res.status(404).json();
  }
};
