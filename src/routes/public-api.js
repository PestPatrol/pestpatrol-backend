const express = require('express');
const auth = require('../configs/passport');
const router = new express.Router();
const {
  loginController,
  registerController,
  googleOauthController
} = require('../controllers/user-controller');

// Multer configuration
const multer = require('multer');
const fileStorageEngine = require('../configs/multer-storage');
const upload = multer({
    storage: fileStorageEngine
});

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

router.post('/login', (req, res) => {
  loginController(req, res)
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