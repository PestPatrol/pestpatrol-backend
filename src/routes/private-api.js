const express = require('express');
const router = new express.Router();
const passport = require('../configs/passport');
const {
  getPredictionHistoryByUserIdController,
  predictController
} = require('../controllers/prediction-controller');
const {
  getArticlesController,
  getLikedArticlesController,
  likeOrDislikeArticleController,
  getArticleDetailController
} = require('../controllers/article-controller');

// Multer configuration
const multer = require('multer');
const fileStorageEngine = require('../configs/multer-storage');
const upload = multer({
  storage: fileStorageEngine
});

// Protected route
router.get('/protected',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
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

// Predict
router.post('/predict',
  upload.single('image'),
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    predictController(req, res);
  });

// Get predictions history of a certain user
router.get('/predict/history',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    getPredictionHistoryByUserIdController(req, res);
  });

// Get list of all articles
// (optional query param: by category)
router.get('/articles',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    getArticlesController(req, res);
  });

// Get favorite (liked) articles
router.get('/articles/liked',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    getLikedArticlesController(req, res);
  });

// Like/dislike article from 'P-Blog' page
router.post('/articles/like',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    likeOrDislikeArticleController(req, res);
  });

// Get article detail by articleId
router.get('/articles/:articleId',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    getArticleDetailController(req, res);
  });

// Like/dislike article from 'article details' page
router.post('/articles/:articleId/like',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    likeOrDislikeArticleController(req, res);
  });

module.exports = router;