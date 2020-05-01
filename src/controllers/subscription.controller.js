// https://cloud.google.com/storage/docs/pubsub-notifications
const storageService = require('../services/storage.service');

module.exports.csvUploadSubscription = async (req, res) => {
  const {bucketId, objectId, eventType} = req.body;
  console.log(`Sub`, req.body);

  // New upload/file replacement
  if (eventType === 'OBJECT_FINALIZE')
    storageService.getFile(bucketId, objectId).catch(err => {
      // Even if this fails for some reason,
      // I'm still sending the "message acknowledged" back to Pub/Sub.
      console.error(err);
    });

  res.sendStatus(200); // Message acknowledged
}
