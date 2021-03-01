const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Note = require("./../models/Note");

//CREATE NOTE FUNCTION
router.post("/createNote", (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    body: req.body.body,
    author: { id: req.body.userId, username: req.body.username },
  });
  User.findOne({ username: req.body.username }, function (err) {
    if (err) return res.status(500).send(err);
  })
    .populate("author", "_id")
    .exec((err,post) => {
      if (err) return res.status(500).send(err);
      else {
        console.log("Populated User: " + post);
      }
    });

  newNote.save(function (err) {
    if (err) return res.status(500).send(err);
  });

  // const newUser = new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
});

//GET NOTE FUNCTION
router.post("/getMyNotes", (req, res) => {
  const userId = req.body.userId;
  Note.find({ "author.id": userId }, (err, note) => {
    // Note that this error doesn't mean nothing was found,
    // it means the database had an error while searching, hence the 500 status
    if (err) return res.status(500).send(err);
    // send the list of all user
    else {
      return res.status(200).send(note);
    }
  });
});

router.get("/getNotes", (req, res) => {
  Note.find((err, note) => {
    // Note that this error doesn't mean nothing was found,
    // it means the database had an error while searching, hence the 500 status
    if (err) return res.status(500).send(err);
    // send the list of all user
    else {
      return res.status(200).send(note);
    }
  });
});

//IN CASE I WANT A SEPARATE UPDATE FUNCTION
router.post("/update", (req, res) => {
  const username = req.body.username;
  const newNote = new Note({
    title: req.body.title,
    body: req.body.body,
    author: { id: req.body.userId, username: req.body.username },
  });
  User.findOneAndUpdate(
    { username },
    { $push: { notes: newNote } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: "user does not exist",
        });
      } else {
        return res.send(user);
      }
    })
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
});

router.delete("/deleteNote", (req, res) => {
  const id = req.body.id;
  User.findByIdAndRemove(id, (err, note) => {
    console.log("clicked");
    if (err) {
      console.log(err);
    } else {
      console.log("Removed Note : ", note);
    }
  });
});

module.exports = router;
