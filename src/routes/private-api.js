const express = require('express');
const router = new express.Router();
const passport = require('../config/passport');


// Protected route
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { email, userId } = req.user;
  return res.json({
    status: 'success',
    message: 'This is a protected route!',
    email,
    userId
  }).status(200);
});

module.exports = router;