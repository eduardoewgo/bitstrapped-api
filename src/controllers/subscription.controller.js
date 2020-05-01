// https://cloud.google.com/storage/docs/pubsub-notifications
const storageService = require('../services/storage.service');
const bigQueryService = require('../services/big-query.service');
const csvParserService = require('../services/csv-parser.service');

module.exports.csvUploadSubscription = async (req, res) => {
  try {
    const event = req.body;

    console.log(`Sub event received`, JSON.stringify(event));

    // New upload/file replacement
    if (event.message.attributes.eventType === 'OBJECT_FINALIZE') {

      // Download to csv/temp/objectId
      await storageService.getFile(event.message.attributes.bucketId, event.message.attributes.objectId);

      // Parse CSV to [Object];
      const parsedCsv = await csvParserService.parseCsvToObjects(`csv/temp/${event.message.attributes.objectId}`);

      // Build schema based on CSV
      const schema = Object.keys(parsedCsv[0]).map(key => ({name: key, type: 'STRING'}));
      const tableId = event.message.attributes.objectId.split('.')[0];

      // Making sure the table is there
      const isTableCreated = await bigQueryService.isTableCreated(tableId);
      if (!isTableCreated) await bigQueryService.createTable(tableId, schema);

      // Note: I believe there were many ways I could've done this, including
      // a data flow directly from the storage to bigquery - without using the sub for this endpoint.

      // Below is another method converting directly from the file, without parsing :)
      // await bigQueryService.insertFromFile(tableId, `csv/temp/${objectId}`);

      // Insert
      await bigQueryService.insertFromJSON(tableId, parsedCsv);
    }

    res.sendStatus(200); // Message acknowledged

  } catch (err) {
    // Even if this flow fails for some reason,
    // I'm still sending the "message acknowledged" back to Pub/Sub.
    // Proper error handling should be done in a real scenario.
    console.error(JSON.stringify(err));
    res.sendStatus(200); // Message acknowledged
  }
}
