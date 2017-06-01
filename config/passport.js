var passport = require('passport');
var jwtOptions = require('./jwtOptions')
const User = require('../models/user');
var passportJWT = require("passport-jwt");
var JwtStrategy = passportJWT.Strategy;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  // usually this would be a database call:
  User.findById(jwt_payload.id, (err, user)=>{
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(strategy);

module.exports = passport;