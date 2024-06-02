const predict = require('../services/predictions/predict');
const getPredictionHistoryByUserId = require('../services/predictions/prediction-history');
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');

async function predictController(req, res) {
  try {
    const imagePath = req.file.path;
    const image = fs.readFileSync(imagePath, 'binary');

    // TODO: Import model from GCS (still troubling: 'Failed to parse model JSON')
    const url = 'https://storage.googleapis.com/pestpatrol-model/model-7/model.json';
    const model = await tf.loadLayersModel(url);

    const prediction = await predict(model, image);

    res.status(201)
      .json({
        success: true,
        message: 'Model predicted successfully',
        data: prediction,
      })
  } catch (error) {
    console.log(error);
    res.json({
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
    res.json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  predictController,
  getPredictionHistoryByUserIdController
};