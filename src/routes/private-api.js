const express = require('express');
const router = new express.Router();
const passport = require('../configs/passport');
const {
  getPredictionHistoryByUserIdController,
  predictController
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
  saveReminderController,
  deleteReminderController
} = require('../controllers/reminder-controller');

// Multer configuration
const multer = require('multer');
const fileStorageEngine = require('../configs/multer-storage');
const upload = multer({
  storage: fileStorageEngine
});

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

// Predict
router.post('/predict',
  upload.single('image'),
  passport.authenticate('jwt', {
    session: false
  }),
   (req, res) => {
    predictController(req, res);
  });

// Get predictions history of a certain user
router.get('/predict/history', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  getPredictionHistoryByUserIdController(req, res);
});

// Get list of all articles
// (optional query param: by category)
router.get('/articles', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  getArticlesController(req, res);
});

// Get favorite (liked) articles
router.get('/articles/liked', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  getLikedArticlesController(req, res);
});

// Like/dislike article from 'P-Blog' page
router.post('/articles/like', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  likeOrDislikeArticleController(req, res);
});

// Get article detail by articleId
router.get('/articles/:articleId', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  getArticleDetailController(req, res);
});

// Like/dislike article from 'article details' page
router.post('/articles/:articleId/like', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  likeOrDislikeArticleController(req, res);
});

// Get active reminders for current user
router.get('/reminders', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  getRemindersController(req, res);
});

// TODO: Get reminders/schedule history
router.get('/reminders/history', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  
});

// Add new reminder
router.post('/reminders', passport.authenticate('jwt', {
  session: false 
}), (req, res) => {
  saveReminderController(req, res);
});

// TODO: Delete reminders
router.delete('/reminders/:reminderId', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  deleteReminderController(req, res);
});

// TODO: Edit reminders
router.post('/reminders/:reminderId/edit', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  saveReminderController(req, res)
})

module.exports = router;