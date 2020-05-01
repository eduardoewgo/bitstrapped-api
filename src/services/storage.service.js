const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

// Ideally, I could also be checking if it's a valid bucket..
module.exports.getFile = async (bucketId, objectId) => {
  const bucket = storage.bucket(bucketId);
  const file = bucket.file(objectId);
  await file.download({destination: `csv/temp/${objectId}`});
};
