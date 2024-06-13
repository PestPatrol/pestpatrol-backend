const getArticles = require('../services/articles/articles-list');
const getArticleDetail = require('../services/articles/article-detail');
const likeOrDislikeArticle = require('../services/articles/like-dislike-article');
const getLikedArticles = require('../services/articles/liked-articles');

async function getArticlesController(req, res) {
  const category = req.query.category;

  try {
    const articles = await getArticles(category);

    res.status(200)
      .json({
        success: true,
        message: 'Articles fetched successfully',
        data: articles
      });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: error.message || 'Error when fetching articles'
      });
  }
}

async function getArticleDetailController(req, res) {
  const articleId = req.params.articleId;

  try {
    const articleDetailData = await getArticleDetail(articleId);

    res.status(200)
      .json({
        success: true,
        message: 'Article fetched successfully',
        data: articleDetailData
      });
  } catch (error) {
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: error.message || 'Error when fetching article detail'
      });
  }
}

async function likeOrDislikeArticleController(req, res) {
  const articleId = (req.body.articleId) ? req.body.articleId : req.params.articleId;
  const userId = req.user.userId;

  try {
    const articleData = await likeOrDislikeArticle(articleId, userId);

    res.status(200)
      .json({
        success: true,
        message: 'Article liked/disliked successfully',
        data: {
          articleId: articleId,
          title: articleData.title,
          category: articleData.category,
          isLiked: articleData.isLiked
        }
      });
  } catch (error) {
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: error.message || 'Error when liking/disliking article'
      });
  }
}

async function getLikedArticlesController(req, res) {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400)
      .json({
        success: false,
        message: 'No user ID found!'
      });
  }

  try {
    const articles = await getLikedArticles(userId);

    res.status(200)
      .json({
        success: true,
        message: 'Articles fetched successfully',
        data: articles
      });
  } catch (error) {
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: error.message || 'Error when fetching liked articles'
      });
  }
}

module.exports = {
  getArticlesController,
  getArticleDetailController,
  likeOrDislikeArticleController,
  getLikedArticlesController
};

