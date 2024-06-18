const tf = require('@tensorflow/tfjs-node');
const { getObject, getObjectPublicUrl } = require('../../app/gcs');
const { createPrediction } = require('./prediction-history');
const { addPredictionIdByUserId } = require('../users/user');
const  { getModel }  = require('../../app/model');
const db = require('../../app/firestore');

async function predict(model, image) {
  try {
    const tensor = tf.node
      .decodeImage(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['BrownSpot', 'Healthy', 'Hispa', 'LeafBlast'];
    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const disease = classes[classResult];

    return { disease, confidenceScore };

  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getSuggestions(disease) {
  // Fetch suggestions from Firestore
  const suggestionsDoc = await db.collection('suggestions').doc(disease).get();
  const suggestionsData = suggestionsDoc.data();

  return suggestionsData;
}

async function predictionService(req){
  try{
    const imagePath = req.file.path;
    const image = await getObject(imagePath);
    const imageUrl = await getObjectPublicUrl(imagePath);
    const model = await getModel();

    const predictionData = await predict(model, image);
    const suggestions = await getSuggestions(predictionData.disease);

    const newPredictionId = await createPrediction(predictionData, imageUrl);

    await addPredictionIdByUserId(req.user.userId, newPredictionId);

    return {
      ...predictionData,
      ...suggestions
    };

  } catch (error) { 
    console.log(error);
    throw error;
  }
}


module.exports = {predict, predictionService};