const express = require('express');
const auth = require('../configs/passport');
const router = new express.Router();
const {
  loginController,
  registerController,
  googleOauthController
} = require('../controllers/user-controller');

// Ping route
router.get('/ping', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Hi!',
    name: req.query.name
  })
});

router.post('/ping', (req, res) => {
  return res.status(200)
    .json({
      success: true,
      // Read JSON request body
      receivedJson: req.body
    });
});

router.post('/register', (req, res) => {
  registerController(req, res)
});

router.post('/login', (req, res) => {
  loginController(req, res)
});

router.get('/auth/google', auth.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/callback', auth.authenticate('google', { session: false }), async (req, res, next) => { 
  googleOauthController(req, res, next)
});

module.exports = router;