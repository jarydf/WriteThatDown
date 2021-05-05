const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("./../models/User");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const opts = {};
require("dotenv").config();

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("JWT");
opts.secretOrKey = process.env.REACT_APP_SECRET;

router.post("/Register", (req, res) => {
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((user) => {
    if (user) {
      return res.send({
        auth: false,
        message: "Email or username already exists",
      });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      if (!newUser.password) {
        return res.send({ auth: false, message: "password is empty" });
      } else {
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.send({
              auth: false,
              message: err,
            });
          }
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              return res.send({
                auth: false,
                message: err,
              });
            } else {
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  res.status(200).send({
                    auth: true,
                    message: user + " user registered",
                  });
                })
                .catch((error) => {
                  if (error.name === "ValidationError") {
                    let errors = {};
                    Object.keys(error.errors).forEach((key) => {
                      errors[key] = error.errors[key].message;
                    });
                    return res.send({
                      auth: false,
                      message: error.errors,
                    });
                  } else {
                    console.log(error.errors);
                    res.send({
                      auth: false,
                      message: "something went wrong",
                    });
                  }
                });
            }
          });
        });
      }
    }
  });
});

router.post("/Login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
      res.status(403).send({
        auth: false,
        message: err,
      });
    }
    if (info !== undefined) {
      console.log(info.message);
      res.send({
        auth: false,
        message: info.message,
      });
    } else {
      req.logIn(user, { session: false }, (err) => {
        if (err) return next(err);
        User.findOne({ username: user.username })
          .then((user) => {
            const token = jwt.sign(
              { id: user._id, username: user.username },
              opts.secretOrKey
            );
            res.status(200).send({
              auth: true,
              token: token,
              message: "user found & logged in",
            });
          })
          .catch((err) =>
            res.status(400).send({
              auth: false,
              message: err,
            })
          );
      });
    }
  })(req, res, next);
});

module.exports = router;
