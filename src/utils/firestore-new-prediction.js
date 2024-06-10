const db = require("../app/firestore");
const crypto = require('crypto');

async function addNewPrediction(predictionData, leafImageUrl, userId) {
  const predictionsCollection = db.collection('predictions');
  const usersCollection = db.collection('users');

  predictionData = {
    ...predictionData,
    createdAt: new Date().toISOString(),
    leafPictureLink: leafImageUrl
  }

  // Add new document & data to 'predictions' collection
  const predictionId = crypto.randomUUID()
  await predictionsCollection.doc(predictionId).set(predictionData);

  // Add new predictions reference (id) to current user
  console.log(`current userId is ${userId}`);
  const userDoc = await usersCollection.doc(userId).get();
  const userData = userDoc.data();
  const userPredictions = userData.predictions;
  userPredictions.push(predictionId);
  await usersCollection.doc(userId).update({
    ...userData,
    predictions: userPredictions
  });
}

module.exports = addNewPrediction;