const db = require('../../app/firestore');
const { getUserById } = require('../users/user');

const predictionsCollection = db.collection('predictions');

async function getPredictionHistoryById(predictionId) {
  try {
    const predictionDoc = await predictionsCollection.doc(predictionId).get();
    if (predictionDoc.empty) {
      return null;
    }
    return predictionDoc.data();
  } catch (error) {
    console.error('Error getting prediction:', error);
    throw new Error('Failed to get prediction by id from Firestore');
  }
}

async function getPredictionHistoryByUserId(userId) {
  try {
    const user = await getUserById(userId);

    const predictionIdList = user.predictions;
    if (!predictionIdList) return null;

    const predictionDocList = [];

    for (const predictionId of predictionIdList) {
      const predictionDoc = await getPredictionHistoryById(predictionId);
      if (predictionDoc) predictionDocList.push(predictionDoc);
    }

    return predictionDocList;
  } catch (error) {
    console.error('Error getting prediction history by user id:', error);
    throw new Error('Failed to get user\'s prediction history');
  }
}

module.exports = {
  getPredictionHistoryByUserId,
  getPredictionHistoryById
};