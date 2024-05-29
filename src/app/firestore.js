const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore({
    databaseId: '(default)',
    projectId: 'pestpatrol',
    
    // eslint-disable-next-line no-undef
    keyFilename: process.env.FIRESTORE_SA_KEY_PATH
});

module.exports = db;