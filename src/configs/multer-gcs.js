const multer = require('multer');
const MulterGoogleCloudStorage = require('multer-cloud-storage').default;
const { v4: uuidv4 } = require('uuid');
const path = require('path');

require('dotenv').config();

const fileGcsEngine = multer({
  storage: new MulterGoogleCloudStorage({
    bucket: process.env.DATA_BUCKET,
    projectId: process.env.PROJECT_ID, 
    keyFilename: path.join(__dirname, 'credentials.json'),
    destination: (req, file, cb) => {
      if (file.fieldname === 'image-predict') {
        cb(null, 'prediction-imgs');
      } else if (file.fieldname === 'image-profile') {
        cb(null, 'profile-imgs');
      } else if (file.fieldname === 'image') {
        cb(null, 'images')
      }  
      else {
        cb(new Error('Invalid fieldname'));
      }
    },
    filename: (req, file, cb) => {
      const uniqueFileName = `${uuidv4()}.jpg`;
      cb(null, uniqueFileName);
    }
  })
});

module.exports = fileGcsEngine;
