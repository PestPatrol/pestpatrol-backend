const express = require('express');
const router = require('../routes/api');


const app = express();

app.use(router);

module.exports = app;