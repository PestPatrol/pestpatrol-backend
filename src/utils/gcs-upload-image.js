const gcs = require("../app/gcs");
const crypto = require('crypto');

async function uploadImageToGcs(req, folder) {
  const bucketName = process.env.PUBLIC_BUCKET_NAME;
  const bucket = gcs.bucket(bucketName);
  const objectName = `${folder}/${crypto.randomUUID()}`;

  const file = bucket.file(objectName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
      acl: 'public-read'
    }
  });

  let cloudStorageError,
    cloudStorageObject,
    cloudStoragePublicUrl;

  await new Promise((resolve, reject) => {
    stream.on('error', (err) => {
      cloudStorageError = err.message;
      reject();
    });

    stream.on('finish', () => {
      cloudStorageObject = objectName;
      cloudStoragePublicUrl = 'https://storage.googleapis.com/' + bucketName + '/' + objectName;
      resolve();
    });

    stream.end(req.file.buffer);
  });

  return { cloudStorageError, cloudStoragePublicUrl, cloudStorageObject }
}

module.exports = uploadImageToGcs;