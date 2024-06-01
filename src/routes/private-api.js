const express = require('express');
const router = new express.Router();
const passport = require('../config/passport');
const getPredictionHistoryByUserIdController = require('../controller/prediction-history-controller');


// Protected route
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  const { email, userId } = req.user;
  return res.status(200).json({
    success: true,
    message: 'Success authorized user to access protected route',
    data: {
      email: email,
      userId: userId
    },
  });
});


router.get('/predict/history', passport.authenticate('jwt', { session: false }), async (req, res) => {
  getPredictionHistoryByUserIdController(req, res);
});

module.exports = router;