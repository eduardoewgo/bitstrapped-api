const express = require('express');
const router = express.Router();

const controller = require('../controllers/subscription.controller');

module.exports = (app) => {
  router.post('/csv-upload', controller.csvUploadSubscription);
  app.use('/subscription', router);
}
