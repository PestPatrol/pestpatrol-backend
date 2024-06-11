const { Storage } = require('@google-cloud/storage');
require('dotenv').config();


const gcs = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.SA_KEY_PATH,
})
async function getObject(objectPath) {
    try {
        const bucketName = process.env.DATA_BUCKET; 
        const [file] = await gcs.bucket(bucketName).file(objectPath).download();
        return file;
    } catch (error) {
        console.error('Error retrieving object from GCS:', error);
        throw error;
    }
}
async function getObjectPublicUrl(objectPath) {
    try {
        const bucketName = process.env.DATA_BUCKET; 
        const file = gcs.bucket(bucketName).file(objectPath);
        const url = `https://storage.googleapis.com/${bucketName}/${objectPath}`;
        return url;
    } catch (error) {
        console.error('Error retrieving object public url from GCS:', error);
        throw error;
    }
}

module.exports = { gcs, getObject, getObjectPublicUrl };