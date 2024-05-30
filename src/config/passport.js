const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/user');

require('dotenv').config();


//Configure the JWT Strategy
const jwtOpts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(
  new JWTStrategy(jwtOpts, (jwt_payload, done) => {
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

passport.use(
  new GoogleStrategy(googleOpts, (accessToken, refreshToken, profile, done) => {
    User.getUserById(profile.id)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        const newUser = {
          email: profile.emails[0].value,
          favArticles: [],
          fullName: profile.displayName,
          password: '',
          profpicLink: profile.photos[0].value,
          userId: profile.id
        };
        User.createUser(newUser)
        .then(user => {
          done(null, user);
        })
        .catch(err => done(err, false));
      }
    })
    .catch(err => done(err, false));
  })
);


module.exports = passport;
