const { Firestore } = require('@google-cloud/firestore');
const path = require('path');
require('dotenv').config();

const db = new Firestore({
  databaseId: process.env.FIRESTORE_DATABASE_ID,
  projectId: process.env.PROJECT_ID,
  keyFilename: path.join(__dirname, '..', '..', 'credentials.json'),
});

module.exports = db;