const mongoose = require('mongoose')
const Note = mongoose.model('Note', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    unique: true
  },
  body: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
    unique: false
  },
  author:{
      type:Schema.Types.ObjectId,
      ref:"User"
  }
}))

module.exports = Note
