const db = require("../app/firestore");
const crypto = require('crypto');

async function addNewPrediction(predictionData, leafImageUrl) {
  const predictionsCollection = db.collection('predictions');
  predictionData = {
    ...predictionData,
    createdAt: new Date().toISOString(),
    leafPictureLink: leafImageUrl,
    reminders: []
  }
  await predictionsCollection.doc(crypto.randomUUID()).set(predictionData);
}

module.exports = addNewPrediction;