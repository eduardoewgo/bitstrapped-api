const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('./config')(app);

module.exports = () => {

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({error: {message: 'Something went wrong.'}});
  });

  // Routes
  app.get('/', (req, res) => {
    res.send(`Yep, I am live at ${process.env.PORT || 3000}!`);
  });
  require('../routes/upload.routes')(app);
  require('../routes/subscription.routes')(app);

  return app;
}

