const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/search.controller');
const { authorize, ADMIN, LOGGED_CUSTOMER } = require('../../middlewares/auth');
const {
  listCustomers,
  createCustomer,
  replaceCustomer,
  updateCustomer,
} = require('../../validations/customer.validation');

const router = express.Router();

router
  .route('/')
  .get(controller.search);

module.exports = router;
