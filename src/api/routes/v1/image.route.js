const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const validate = require('express-validation');
const controller = require('../../controllers/image.controller');
const { authorize, ADMIN, LOGGED_CUSTOMER } = require('../../middlewares/auth');
// File upload settings  
const PATH = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null,  Date.now() + '-' +file.originalname)
  }
});

let upload = multer({
  storage: storage
});

const router = express.Router();

router
  .route('/:customerId/upload')
  .get(authorize(LOGGED_CUSTOMER), controller.get)
  .patch(authorize(LOGGED_CUSTOMER), upload.single('image'), controller.upload)
  .delete(authorize(LOGGED_CUSTOMER), controller.remove);

module.exports = router;
