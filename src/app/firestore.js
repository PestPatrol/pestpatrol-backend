const { Firestore } = require('@google-cloud/firestore');
require('dotenv').config();

const db = new Firestore({
    databaseId: '(default)',
    projectId: 'pestpatrol',
    keyFilename: process.env.SA_KEY_PATH
});

module.exports = db;



