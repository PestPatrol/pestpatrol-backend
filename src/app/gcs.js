const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const gcs = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.SA_KEY_PATH,
})

module.exports = gcs;