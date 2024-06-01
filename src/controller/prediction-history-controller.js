const getPredictionHistoryByUserId = require('../service/prediction/prediction-history');

const getPredictionHistoryByUserIdController = async (req, res) => {
  try{
    const predictionHistoryData = await getPredictionHistoryByUserId(req.user.userId);
    res.status(200).json({
      success: true,
      message: 'Prediction history fetched successfully',
      data: predictionHistoryData
    });
  } catch{
    res.status(404).json({
      success: false,
      message: 'Prediction history failed to fetch'
    });
  }
};

module.exports = getPredictionHistoryByUserIdController;