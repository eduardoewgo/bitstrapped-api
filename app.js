const port = process.env.PORT || 3000;

// Load modules
const app = require('./src/config/express')();

app.listen(port, () => {
  console.log(`Live at ${port}`);
});

module.exports = app;
