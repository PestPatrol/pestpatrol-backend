const { getPredictionHistoryByUserId } = require('../services/predictions/prediction-history');
const { predictionService } = require('../services/predictions/prediction');

async function predictionController(req, res) {
  try {
    const predictionData = await predictionService(req);
    res.status(201)
      .json({
        success: true,
        message: 'Prediction success',
        data: predictionData,
      });
  } catch (error) {
    res.status(500)
      .json({
        success: false,
        message: 'Prediction failed: ' + error.message,
      });
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
        message: 'Error when fetching prediction history: ' + error.message,
      });
  }
};

module.exports = {
  predictionController,
  getPredictionHistoryByUserIdController
};