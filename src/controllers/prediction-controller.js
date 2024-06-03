const predict = require('../services/predictions/predict');
const getPredictionHistoryByUserId = require('../services/predictions/prediction-history');
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const dummyPredict = require('../services/predictions/predict-dummy');
const uploadImageToGcs = require('../utils/gcs-upload-image');
const addNewPrediction = require('../utils/firestore-new-prediction');

async function predictController(req, res) {
  try {
    // Local image path
    const imagePath = req.file.path;

    const image = fs.readFileSync(imagePath);

    // TODO: Import model from GCS (still troubling: 'ValueError: An InputLayer should be passed either a `batchInputShape` or an `inputShape`.')
    const url = 'https://storage.googleapis.com/pestpatrol-model/models-6/model.json';
    console.log('Model loading...');
    const model = await tf.loadLayersModel(url);
    console.log('Model loaded!');

    
    // Upload leaf image to GCS
    let uploadImageStatus;
    try {
      uploadImageStatus = await uploadImageToGcs(req, process.env.PREDICTION_FOLDER);
    } catch (error) {
      return res.status(error.statusCode)
      .json({
        success: false,
        message: 'Failed uploading image data to database'
      });
    }
    const leafImageUrl = uploadImageStatus.cloudStoragePublicUrl;

    // Use the model to predict
    const prediction = await predict(model, image);
    // const dummyResult = dummyPredict();

    // Upload prediction result to Firestore
    try {
      await addNewPrediction(prediction, leafImageUrl);
      // await addNewPrediction(dummyResult, leafImageUrl);
    } catch (error) {
      return res.status(error.statusCode)
        .json({
          success: false,
          message: 'Failed saving prediction data to database'
        });
    }

    res.status(201)
      .json({
        success: true,
        message: 'Model predicted successfully',
        data: prediction,
        // data: dummyResult
      })
  } catch (error) {
    console.log(error);
    res.status(500)
      .json({
        success: false,
        message: 'Error when loading model or getting predictions'
      })
  }
}

async function getPredictionHistoryByUserIdController(req, res) {
  try {
    const predictionHistoryData = await getPredictionHistoryByUserId(req.user.userId);
    res.status(200)
      .json({
        success: true,
        message: 'Prediction history fetched successfully',
        data: predictionHistoryData
      });
  } catch (error) {
    res.status(500)
      .json({
        success: false,
        message: error.message
      });
  }
};

module.exports = {
  predictController,
  getPredictionHistoryByUserIdController
};