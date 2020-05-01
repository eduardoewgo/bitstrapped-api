const port = process.env.PORT || 3000;

// Load modules
const app = require('./src/config/express')();

app.listen(port, () => {
  console.log(`Live at ${port} [${process.env.NODE_ENV}]`);
});

module.exports = app;
