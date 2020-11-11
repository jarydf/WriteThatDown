const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Note = require("./../models/Note");

//CREATE NOTE FUNCTION
router.post("/createNote", (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "user does not exist" });
      } else {
        //save notes first
        const newNote = new Note({
          title: req.body.title,
          body: req.body.body,
          author: { id: req.body.userId, username: req.body.username },
        });
        newNote
          .save()
          .then((note) => res.json(note))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
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

//IN CASE I WANT A SEPARATE UPDATE FUNCTION
router.route("/update").post(function (req, res) {
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
        return res.status(400).json({ message: "user does not exist" });
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

module.exports = router;
