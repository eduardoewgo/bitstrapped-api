const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'csv/temp'});

const {validate} = require('../middlewares/utils.middleware');
const controller = require('../controllers/upload.controller');

module.exports = (app) => {
  router.post('/csv', upload.single('file'), controller.uploadCsv);
  app.use('/upload', router);
}
