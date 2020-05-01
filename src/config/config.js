/*
* Any environment-specific logic that you might need should be included in the
* respective environment file.
*/

module.exports = (app) => require(`./env/${process.env.NODE_ENV || 'development'}.env.js`)(app);
