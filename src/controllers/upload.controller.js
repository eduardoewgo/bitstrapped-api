const storageService = require('../services/storage.service');

module.exports.uploadCsv = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(422).send({error: {message: 'File is missing.'}})

    await storageService.uploadFile('bst_csv', req.file);
    res.sendStatus(200);

  } catch (e) {
    // TODO: create a proper errorHandler..
    next(e);
  }
}
