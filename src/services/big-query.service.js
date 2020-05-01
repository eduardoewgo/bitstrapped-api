// https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

const datasetId = 'bitstrapped';

module.exports.createTable = async (tableId, schema) => {
  return new Promise(async (resolve, reject) => {
    bigquery
      .dataset(datasetId)
      .createTable(tableId, {schema})
      .then(table => resolve(table))
      .catch(reject);
  })
}

module.exports.isTableCreated = async (tableId) => {
  return new Promise(async (resolve, reject) => {
    bigquery
      .dataset(datasetId)
      .table(tableId)
      .get()
      .then(([table]) => resolve(true))
      .catch(() => resolve(false));
  });
}

module.exports.insertFromFile = async (tableId, filePath) => {
  return new Promise(async (resolve, reject) => {
    bigquery
      .dataset(datasetId)
      .table(tableId)
      .load(filePath)
      .then(([job]) => {
        console.log(`Job ${job.id} completed.`);
        resolve(job);
      }).catch(reject);
  })
}

module.exports.insertFromJSON = async (tableId, rows) => {
  return new Promise(async (resolve, reject) => {
    bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(rows)
      .then(resolve)
      .catch(reject);
  });
}
