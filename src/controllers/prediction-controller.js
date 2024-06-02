const predict = require('../services/predictions/predict');
const getPredictionHistoryByUserId = require('../services/predictions/prediction-history');
const tf = require('@tensorflow/tfjs-node');

async function predictController(req, res) {
  try {
    // TODO: Handle image in request body
    const image = req.body.image;
    console.log(`image is:`);
    console.log(image);

    // TODO: Import model from GCS (still troubling: 'Failed to parse model JSON')
    const url = 'https://storage.cloud.google.com/pestpatrol-model/model-4/model.h5';
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
      message: error.message
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