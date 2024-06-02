const gcs = require('../app/gcs');
const tf = require('@tensorflow/tfjs-node');

function getSignedUrl() {
  const myBucket = gcs.bucket('pestpatrol-model');
  const file = myBucket.file('model-2/2.json');

  const currentTime = new Date();
  const fiveMinsLater = new Date(currentTime.getTime() + 60000 * 5);

  const config = {
    action: 'read',
    expires: fiveMinsLater
  };

  return new Promise((resolve, reject) => {
    file.getSignedUrl(config, (err, url) => {
      if (err) {
        reject('Error happened.');
      } else {
        resolve(url);
      }
    });
  });
}

// getSignedUrl().then(url => {
//   const model = tf.loadGraphModel(url)
//   module.exports = model;
// }).catch(error => {
//   // TODO: Handle error
//   console.log(`Error (URL) happened: ${error.message}`);
// });

module.exports = getSignedUrl;
