const bcrypt = require("bcrypt");
const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  User = require('../models/User'),
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;
const opts = {};
require('dotenv').config();

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = process.env.SECRET;

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({username: username})
        .then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          } 
          else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log('passwords do not match');
                return done(null, false, { message: 'passwords do not match' });
              }
              console.log('user found & authenticated');
              return done(null, user);
            });
          }
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          username: jwt_payload.id,
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);
module.exports=passport;