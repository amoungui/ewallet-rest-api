const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/contact.controller');
const { authorize, ADMIN, LOGGED_CUSTOMER } = require('../../middlewares/auth');
const {
  listCustomers,
  createCustomer,
  replaceCustomer,
  updateCustomer,
} = require('../../validations/customer.validation');

const router = express.Router();

router
  .route('/:customerId')
  /**
   * @api {get} v1/contacts/:customerId List of Customer contact
   * @apiDescription Get a list of customer contact
   * @apiVersion 1.0.0
   * @apiName ListContact
   * @apiGroup Contacts

   * @apiPermission customer
   *
   * @apiHeader {String} Athorization  Customer's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-15}}      [perPage=1]  Contacts per page
   *
   * @apiSuccess {Object[]} customers List of customer contacts.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated customers can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(LOGGED_CUSTOMER), controller.listAllContactOfCustomer) 

  /**
   * @api {patch} v1/contacts/:customerId Create Contact
   * @apiDescription Create a new contact
   * @apiVersion 1.0.0
   * @apiName CreateContact
   * @apiGroup Contact
   * @apiPermission customer
   *
   * @apiHeader {String} Athorization  Customer's access token
   *
   * @apiParam  {String}             phone     Customer's phone
   *
   * @apiSuccess (Created 201) {String}  id         Customer's id
   * @apiSuccess {Number}  accountNumber         Customer's accountNumber
   * @apiSuccess (Created 201) {String}  name       Customer's name
   * @apiSuccess (Created 201) {String}  email      Customer's email
   * @apiSuccess (Created 201) {String}  role       Customer's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated customers can create the data
   */
  .patch(controller.create)

  /**
   * @api {patch} v1/contacts/:customerId Delete a Customer contact
   * @apiDescription Delete a customer contact
   * @apiVersion 1.0.0
   * @apiName DeleteContact
   * @apiGroup Contact
   * @apiPermission customer
   *
   * @apiHeader {String} Athorization  Customer's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated customers can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only customer with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Contact does not exist
   */  
  .delete(authorize(LOGGED_CUSTOMER), controller.remove);

module.exports = router;
