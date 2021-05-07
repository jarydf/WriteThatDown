const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    phone: {
      type: Number,
      validate: {
        validator: function (v) {
          return /d{10}/.test(v);
        },
        message: "{VALUE} is not a valid 10 digit number!",
      },
      unique: true,
    },
    bio: { type: String, maxlength: 255, unique: false, required: false },
  })
);

module.exports = User;
