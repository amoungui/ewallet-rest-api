const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/payment.controller');
const { authorize, ADMIN, LOGGED_CUSTOMER } = require('../../middlewares/auth');
const {
  listCustomers,
  createCustomer,
  replaceCustomer,
  updateCustomer,
} = require('../../validations/customer.validation');

const router = express.Router();

router
  .route('/customer')
  /**
   * @api {post} v1/account/customer create a customer account
   * @apiDescription Create a new customer Dwolla account 
   * @apiVersion 1.0.0
   * @apiName CreateCustomer
   * @apiGroup Payment
   * @apiPermission customer
   *
   * @apiHeader {String} Athorization  Customer's access token
   *
   * @apiParam  {String}             email     Customer's email
   * @apiParam  {String}             firstName  Customer's firstName
   * @apiParam  {String}             lastName  Customer's lastName
   * @apiParam  {String}             type  Customer's type
   * @apiParam  {String}             businessName    Customer's businessName
   * @apiParam  {String}             correlationId    Customer's correlationId
   * @apiParam  {String=customer,admin}  [role]    Customer's role
   *
   * @apiSuccess (Created 201) {String}  id         Customer's id
   * @apiSuccess {Number}  accountNumber         Customer's accountNumber
   * @apiSuccess (Created 201) {String}  name       Customer's name
   * @apiSuccess (Created 201) {String}  email      Customer's email
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated customers can create the data
   * @apiError (Forbidden 403)     Forbidden        Page not accessible

   */  
  .post(controller.create) //authorize(), 

router
  .route('/customer/:customerId')
  /**
   * @api {get} v1/account/customer/:id Dwolla Customer Profile
   * @apiDescription Get logged in Dwolla customer profile information
   * @apiVersion 1.0.0
   * @apiName CustomerProfile
   * @apiGroup Payment
   * @apiPermission customer
   *
   * @apiHeader {String} Athorization  Customer's access token
   *
   * @apiSuccess {String}  id         Customer's id
   * @apiSuccess {Number}  accountNumber         Customer's accountNumber
   * @apiSuccess {String}  name       Customer's name
   * @apiSuccess {String}  email      Customer's email
   * @apiSuccess {String}  role       Customer's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Customers can access the data
   */
  .get(authorize(), controller.get) // 

  /**
   * @api {patch} v1/account/customer/:id Update Dwolla Customer Profile
   * @apiDescription Update some fields of a customer document
   * @apiVersion 1.0.0
   * @apiName UpdateCustomer
   * @apiGroup Payment
   * @apiPermission customer
   *
   * @apiHeader {String} Athorization  Customer's access token
   *
   * @apiParam  {String}             email     Customer's email
   * @apiParam  {String{6..128}}     password  Customer's password
   * @apiParam  {String{..128}}      [name]    Customer's name
   * @apiParam  {String=customer,admin}  [role]    Customer's role
   * (You must be an admin to change the customer's role)
   *
   * @apiSuccess {String}  id         Customer's id
   * @apiSuccess {Number}  accountNumber         Customer's accountNumber
   * @apiSuccess {String}  name       Customer's name
   * @apiSuccess {String}  email      Customer's email
   * @apiSuccess {String}  role       Customer's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated customers can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only customer with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Customer does not exist
   */  
  .patch(controller.update) //authorize(LOGGED_CUSTOMER), validate(updateCustomer), 
  
  .post(controller.addBankAccount)    
module.exports = router;
