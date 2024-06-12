const { Firestore } = require('@google-cloud/firestore');
require('dotenv').config();

const db = new Firestore({
  databaseId: process.env.FIRESTORE_DATABASE_ID,
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.SA_KEY_PATH
});

module.exports = db;