const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../services/users/user');

require('dotenv').config();

//Configure the JWT Strategy
const jwtOpts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

// Add middleware to private routes to check for a valid JWT
passport.use(
  new JWTStrategy(jwtOpts, (jwt_payload, done) => {
    //jwt_payload is the decoded JWT payload that contains id or userId
    User.getUserById(jwt_payload.id)
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => done(err, false));
  })
)

//Configure the Google Oauth2 Strategy
const googleOpts = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}

// Add middleware when user logs in with Google OAuth
passport.use(
  //profile is the user profile returned from Google
  new GoogleStrategy(googleOpts, (accessToken, refreshToken, profile, done) => { 
    User.getUserById(profile.id)
      .then(user => {
        if (user) {
          // If user already registered, add user from db to req (req.user), then generate token in user-controller.js in the googleOauth function and send token in response
          done(null, user);
        } else {
          // If user not registered, create new user, add user to req (req.user), then generate token in user-controller.js in the googleOauth function and send token in response
          const newUser = {
            email: profile.emails[0].value,
            fullName: profile.displayName,
            favArticles: [],
            password: '',
            predictions: [],
            profpicLink: profile.photos[0].value,
            reminders: [],
            userId: profile.id
          };

          // Create new user and return the created user
          User.createUser(newUser)
            .then(user => {
              // Add new user to req (req.user), then generate token in user-controller.js in the googleOauth function and send token in response
              done(null, user);
            })
            // if createUser fails, return error, handled in user-controller.js in googleOauth function
            .catch(err => done(err, false));
        }
      })
      // if getUserById fails, return error handled in user-controller.js in googleOauth function
      .catch(err => done(err, false));
  })
);


module.exports = passport;
