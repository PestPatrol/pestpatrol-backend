const express = require('express');
const getHistoryData = require('../service/firestore/predictions-history');
const getArticleDetail = require('../service/firestore/article-detail');
const likeOrDislikeArticle = require('../service/firestore/like-dislike-article');
const getArticles = require('../service/firestore/articles-list');

const router = new express.Router();

// Test routes
router.get('/test', (req, res) => {
    return res.status(200)
        .json({
            status: 'success',
            message: 'Hi!',
            // Optional query parameters
            name: req.query.name
        });
});

router.post('/test', (req, res) => {
    return res.status(200)
        .json({
            status: 'success',
            // Read JSON request body
            receivedJson: req.body
        })
})

// Get history
router.get('/predict/history/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const predictionHistoryData = await getHistoryData(userId);

        return res.status(200)
            .json({
                status: 'success',
                data: predictionHistoryData,
            });
    } catch (error) {
        return res.status(error.statusCode)
            .json({
                status: 'fail',
                message: error.message
            });
    }
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
            })
    } catch (error) {
        return res
            .json({
                status: 'fail',
                message: error.message
            })
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
            })
    } catch (error) {
        return res
            .json({
                status: 'fail',
                message: error.message
            })
    }
});

module.exports = router;