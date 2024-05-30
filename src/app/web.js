const express = require('express');
const publicRouter = require('../routes/public-api');
const privateRouter = require('../routes/private-api');
const passport = require('../config/passport');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(publicRouter);
app.use(privateRouter);

module.exports = app;