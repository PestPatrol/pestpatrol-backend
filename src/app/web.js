const express = require('express');
const publicRouter = require('../routes/public-api');
const privateRouter = require('../routes/private-api');
const passport = require('../configs/passport');
const bodyParser = require('body-parser');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.raw({
//   type: 'image/*',
//   limit: '1mb'
// }));

app.use(passport.initialize());
app.use(publicRouter);
app.use(privateRouter);

module.exports = app;