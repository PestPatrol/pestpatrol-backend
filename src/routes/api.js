const express = require('express');
const getHistoryData = require('../service/firestore/predictions-history');
const getArticleDetail = require('../service/firestore/article-detail');
const likeOrDislikeArticle = require('../service/firestore/like-dislike-article');

const router = new express.Router();

// Test route
router.get('/test', (req, res) => {
    return res.status(200)
        .json({
            status: 'success',
            message: 'Hi!'
        });
});

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

// Get articles list

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
        console.log(error);
        return res.status(error.statusCode)
            .json({
                status: 'fail',
                message: error.message
            });
    }
})

// Like/dislike article
router.get('/articles/:articleId/like', async (req, res) => {
    const articleId = req.params.articleId;

    try {
        const articleData = await likeOrDislikeArticle(articleId);

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
})

module.exports = router;