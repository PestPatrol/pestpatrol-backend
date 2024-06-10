const gcs = require("../app/gcs");
const crypto = require('crypto');

async function uploadFileToGcs(req) {
  const bucketName = process.env.DATA_BUCKET;
  const bucket = gcs.bucket(bucketName);

  const localFilePath = req.file.path;

  const destinationFilePath = `prediction-imgs/${crypto.randomUUID()}`;

  const generationMatchPrecondition = 0;
  const options = {
    destination: destinationFilePath,
    preconditionOpts: {
      ifGenerationMatch: generationMatchPrecondition
    },
    metadata: {
      contentType: req.file.mimetype,
      acl: 'public-read'
    }
  };

  await bucket.upload(localFilePath, options);
  return 'https://storage.googleapis.com/' + bucketName + '/' + destinationFilePath;
}

// module.exports = uploadImageToGcs;
module.exports = uploadFileToGcs;