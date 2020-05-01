module.exports.uploadCsv = async (req, res, next) => {
  try {
    console.log(req.file);
    if (!req.file)
      return res.status(422).send({error: {message: 'File is missing.'}})
    else
      res.send({data: {filename: req.filename}});
  } catch (e) {
    // TODO: create a proper errorHandler..
    next(e);
  }
}
