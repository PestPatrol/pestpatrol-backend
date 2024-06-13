const { Storage } = require('@google-cloud/storage');
const path = require('path');
require('dotenv').config();

const gcs = new Storage({
	projectId: process.env.PROJECT_ID,
	keyFilename: path.join(__dirname, '..', '..', 'credentials.json'),
});

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
		const url = `https://storage.googleapis.com/${bucketName}/${objectPath}`;
		return url;
	} catch (error) {
		console.error('Error retrieving object public url from GCS:', error);
		throw error;
	}
}

async function deleteObject(objectUrl) {
	try {
		const objectPath = objectUrl.replace(`https://storage.googleapis.com/${process.env.DATA_BUCKET}/`, '');
		await gcs.bucket(process.env.DATA_BUCKET).file(objectPath).delete();
	} catch (error) {
		console.error('Error deleting object from GCS:', error);
		throw new Error('Error deleting object from GCS:', error);
	}
}

module.exports = {
	gcs,
	getObject,
	getObjectPublicUrl,
	deleteObject
};