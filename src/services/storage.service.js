const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

// Ideally, I could also be checking if it's a valid bucket..
module.exports.getFile = async (bucketId, objectId) => {
  return new Promise(async (resolve, reject) => {
    const bucket = storage.bucket(bucketId);
    const file = bucket.file(objectId);
    file.download({destination: `csv/temp/${objectId}`})
      .then(resolve)
      .catch(reject);
  })
};

module.exports.uploadFile = async (bucketId, {path, originalname}) => {
  return new Promise(async (resolve, reject) => {
    const bucket = storage.bucket(bucketId);
    bucket.upload(path, {destination: originalname})
      .then(resolve)
      .catch(reject);
  })
}
