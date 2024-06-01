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

// Get list of all articles
// (optional query param: by category)
router.get('/articles', async (req, res) => {
  const category = req.query.category;

  try {
    const articles = await getArticles(category);

    return res.status(200)
      .json({
        status: 'success',
        data: articles
      });
  } catch (error) {
    return res.status(error.statusCode)
      .json({
        status: 'fail',
        message: error.message
      });
  }
});

// Get favorite (liked) articles
router.get('/articles/liked', async (req, res) => {
  const userId = req.query.userId;
  console.log(`userId is ${userId}`);

  if (!userId) {
    return res.status(400)
      .json({
        status: 'fail',
        message: 'No userId found!'
      });
  }

  try {
    const articles = await getLikedArticles(userId);

    return res.status(200)
      .json({
        status: 'success',
        data: articles
      });
  } catch (error) {
    return res
      .json({
        status: 'fail',
        message: error.message
      });
  }
});

// Like/dislike article from 'P-Blog' page
router.post('/articles/like', async (req, res) => {
  const articleId = req.body.articleId;
  const userId = req.body.userId;

  try {
    const articleData = await likeOrDislikeArticle(articleId, userId);

    return res.status(200)
      .json({
        status: 'success',
        data: {
          articleId: articleId,
          title: articleData.title,
          category: articleData.category,
          isLiked: articleData.isLiked
        }
      });
  } catch (error) {
    return res
      .json({
        status: 'fail',
        message: error.message
      });
  }
});

// Get article detail by articleId
router.get('/articles/:articleId', async (req, res) => {
  const articleId = req.params.articleId;

  try {
    const articleDetailData = await getArticleDetail(articleId);

    return res.status(200)
      .json({
        status: 'success',
        data: articleDetailData
      });
  } catch (error) {
    return res.status(error.statusCode)
      .json({
        status: 'fail',
        message: error.message
      });
  }
});

// Like/dislike article from 'article details' page
router.post('/articles/:articleId/like', async (req, res) => {
  const articleId = req.params.articleId;
  const userId = req.body.userId;

  try {
    const articleData = await likeOrDislikeArticle(articleId, userId);

    return res.status(200)
      .json({
        status: 'success',
        data: {
          articleId: articleId,
          title: articleData.title,
          category: articleData.category,
          isLiked: articleData.isLiked
        }
      });
  } catch (error) {
    return res
      .json({
        status: 'fail',
        message: error.message
      });
  }
});

module.exports = router;