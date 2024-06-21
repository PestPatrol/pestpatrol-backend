const express = require('express');
const publicRouter = require('../routes/public-api');
const privateRouter = require('../routes/private-api');
const passport = require('../configs/passport');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'html')));
app.use(passport.initialize());
app.use(publicRouter);
app.use(privateRouter);

module.exports = app;