const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const opts = {}
require('dotenv').config()

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('JWT')
opts.secretOrKey = process.env.SECRET

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    (username, password, done) => {
      try {
        User.findOne({ username: username })
          .then(user => {
            if (user === null) {
              return done(null, false, { message: 'bad username' })
            } else {
              bcrypt.compare(password, user.password).then(response => {
                if (response !== true) {
                  console.log('passwords do not match')
                  return done(null, false, { message: 'passwords do not match' })
                }
                console.log('user found & authenticated')
                return done(null, user)
              })
            }
          })
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwtPayload, done) => {
    try {
      User.findOne({
        where: {
          username: jwtPayload.id
        }
      }).then(user => {
        if (user) {
          console.log('user found in db in passport')
          // note the return removed with passport JWT - add this return for passport local
          done(null, user)
        } else {
          console.log('user not found in db')
          done(null, false)
        }
      })
    } catch (err) {
      done(err)
    }
  })
)
module.exports = passport
