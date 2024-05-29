const express = require('express');
const getHistoryData = require('../service/firestore/predictions-history');

const router = new express.Router();

// Test route
router.get('/test', (req, res) => {
    return res.json({
        status: 'success',
        message: 'Hi!'
    }).status(200);
});

// Get history
router.get('/predict/histories', async (req, res) => {
    const predictionHistoryData = await getHistoryData(); 

    return res.json({
        status: 'success',
        data: predictionHistoryData,
    })
});

module.exports = router;