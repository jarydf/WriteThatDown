const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('./../models/User')
const ExtractJWT = require('passport-jwt').ExtractJwt
const opts = {}
require('dotenv').config()

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('JWT')
opts.secretOrKey = process.env.SECRET

router.post('/Register', (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' })
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
        })
      })
    }
  })
})

router.post('/Login', (req, res, next) => {
  console.log(req.body)
  passport.authenticate('login',{session: false},(err, user, info) => {
    if (err) {
      console.log(err)
      res.send({
        auth: false,
        message: err
      })
    }
    if (info !== undefined) {
      console.log(info.message)
      res.send({
        message: info.message
      })
    }
    else {
      req.logIn(user, {session:false}, (err) => {
        if (err) return next(err)
        User.findOne({ username: user.username })
          .then(user => {
            const token = jwt.sign({ id: user.username }, opts.secretOrKey)
            res.status(200).send({
              auth: true,
              token: token,
              message: 'user found & logged in'
            })
          })
          .catch((err) =>
            res.status(400).send({
              auth: false,
              message: err
            }))
      })
    }
  })(req, res, next)
})

module.exports = router
