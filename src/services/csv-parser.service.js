const csv = require('csv-parser')
const fs = require('fs')
const results = [];

module.exports.parseCsvToObjects = (filePath) => {
  return new Promise((resolve, reject) => {
    const rStream = fs.createReadStream(filePath);
    rStream.on('error', reject);
    rStream.pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      });
  });
}
