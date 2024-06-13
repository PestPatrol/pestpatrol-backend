const express = require('express');
const auth = require('../configs/passport');
const router = new express.Router();
const {
  loginController,
  registerController,
  googleOauthController,
  forgotPasswordController
} = require('../controllers/user-controller');

// Multer configuration
const upload = require('../configs/multer-gcs');

// Ping route
router.get('/ping',
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'Pong!',
      name: req.query.name
    })
  });

router.post('/ping',
  (req, res) => {
    return res.status(200)
      .json({
        success: true,
        // Read JSON request body
        receivedJson: req.body
      });
  });

// Image in request body
router.post('/submit',
  upload.single('image'),
  (req, res) => {
    console.log(req.file);
    return res.status(201)
      .json({
        success: true,
        receivedImg: req.file
      });
  });

// Register
router.post('/register',
  (req, res) => {
    registerController(req, res)
  });

router.post('/login',
  (req, res) => {
  loginController(req, res)
});

// Forgot password
router.post('/forgot-password',
  async (req, res) => {
  /*
   * Handle the forgot password logic here.
  
   * Flow:
   * 
   * 1. Get user from posted/input email
   * 2. Generate a random reset token --> save to Firestore
   * 3. Send the token to user's email
   */
  await forgotPasswordController(req, res);
});

// TODO: Reset password
router.put('/reset-password/:resetToken',
  (req, res) => {
  // TODO: Handle reset password logic here

});

// Login with Google
router.get('/auth/google',
  auth.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get('/auth/google/callback',
  auth.authenticate('google', {
    session: false
  }),
  (req, res, next) => {
    googleOauthController(req, res, next)
  });

module.exports = router;