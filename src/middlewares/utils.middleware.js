const {validationResult} = require("express-validator");

module.exports.validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  const dupCheck = [];

  errors.array().map(err => {
    if (!dupCheck.includes(`${err.param}-${err.msg}`)) {
      extractedErrors.push({
        [err.param]: err.msg
      });
      dupCheck.push(`${err.param}-${err.msg}`);
    }
  });

  return res.status(422).send({error: {message: 'Invalid inputs.', data: extractedErrors}});
};
