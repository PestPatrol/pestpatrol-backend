const predict = require('../services/predictions/predict');
const getPredictionHistoryByUserId = require('../services/predictions/prediction-history');
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const addNewPrediction = require('../utils/firestore-new-prediction');
const uploadFileToGcs = require('../utils/gcs-upload-image');
const path = require('path');

async function predictController(req, res) {
  try {
    // Local image path
    const imagePath = req.file.path;

    const image = fs.readFileSync(imagePath);

    // TODO: Import model from GCS (still troubling: 'ValueError: An InputLayer should be passed either a `batchInputShape` or an `inputShape`.')
    const modelDir = path.join(__dirname, '../../model/model.json');
    const url = tf.io.fileSystem(modelDir);
    console.log('Model loading...');
    const model = await tf.loadLayersModel(url);
    console.log('Model loaded!');

    
    // Upload leaf image to GCS
    let imageUrl;
    try {
      // uploadImageStatus = await uploadImageToGcs(image, process.env.PREDICTION_FOLDER);
      imageUrl = await uploadFileToGcs(req)
    } catch (error) {
      console.log(error);
      return res.status(500)
      .json({
        success: false,
        message: 'Failed uploading image data to database'
      });
    }

    // Use the model to predict
    const prediction = await predict(model, image);

    // Upload prediction result to Firestore
    try {
      await addNewPrediction(prediction, imageUrl, req.user.userId);
      // await addNewPrediction(dummyResult, leafImageUrl);
    } catch (error) {
      console.log(error);
      return res.status(500)
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