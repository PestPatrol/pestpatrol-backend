const express = require('express');
const router = new express.Router();
const passport = require('../configs/passport');

const {
  getPredictionHistoryByUserIdController,
  predictionController
} = require('../controllers/prediction-controller');

const {
  getArticlesController,
  getLikedArticlesController,
  likeOrDislikeArticleController,
  getArticleDetailController
} = require('../controllers/article-controller');

const {
  getRemindersController,
  getReminderHistoryController,
  getReminderDetailController,
  saveReminderController,
  deleteReminderController,
  finishReminderController
} = require('../controllers/reminder-controller');

const {
  getProfileController,
  editProfileController
} = require('../controllers/profile-controller');

// Multer configuration
const upload = require('../configs/multer-gcs');

// Protected route
router.get('/protected',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
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

// TODO: Reset password
// router.put('/reset-password/:resetToken', 
//   (req, res) => {
//   // TODO: Handle reset password logic here (same or different with public-api ?)

// });

// Predict
router.post('/predict',
  upload.single('image-predict'),
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    predictionController(req, res);
  });

// Get predictions history of a certain user
router.get('/predict/history',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    getPredictionHistoryByUserIdController(req, res);
  });

// Get list of all articles
// (optional query param: by category)
router.get('/articles',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    getArticlesController(req, res);
  });

// Get favorite (liked) articles
router.get('/articles/liked',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    getLikedArticlesController(req, res);
  });

// Like/dislike article from 'P-Blog' page
router.put('/articles/like',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    likeOrDislikeArticleController(req, res);
  });

// Get article detail by articleId
router.get('/articles/:articleId',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    getArticleDetailController(req, res);
  });

// Like/dislike article from 'article details' page
router.put('/articles/:articleId/like',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    likeOrDislikeArticleController(req, res);
  });

// Get active reminders for current user
router.get('/reminders',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    getRemindersController(req, res);
  });

// Finish a reminder
router.get('/reminders/:reminderId/finish',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    finishReminderController(req, res);
  });

// Get all reminder history
router.get('/reminders/history',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    getReminderHistoryController(req, res);
  });

// Add new reminder
router.post('/reminders',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    saveReminderController(req, res);
  });

// Delete a reminder
router.delete('/reminders/:reminderId',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    deleteReminderController(req, res);
  });

// Get reminder data/details
router.get('/reminders/:reminderId',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    getReminderDetailController(req, res);
  });

// Edit a reminder
router.put('/reminders/:reminderId/edit',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    saveReminderController(req, res);
  });

// Profile
router.get('/profile',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    getProfileController(req, res);
  });

// Edit profile
router.put('/profile/edit',
  upload.single('image-profile'),
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    editProfileController(req, res);
  });

module.exports = router;