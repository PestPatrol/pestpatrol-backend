const db = require('../../app/firestore');
const { getUserById } = require('../user/user');

const predictionCollection = db.collection('predictions');


async function getPredictionHistoryById(predictionId) {
  try {
    const predictionDoc = await predictionCollection.doc(predictionId).get();
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
    const predictionDocList = [];

    for (const predictionId of predictionIdList) {
      const predictionDoc = await getPredictionHistoryById(predictionId);
      if (predictionDoc) {
        predictionDocList.push(predictionDoc);
      }
    }
    if (predictionDocList.empty) {
      return null;
    }
    return predictionDocList;
  } catch (error) {
    console.error('Error getting prediction history by user id:', error);
    throw new Error('Failed to get prediction history by user id from Firestore');
  }
}



module.exports = getPredictionHistoryByUserId;