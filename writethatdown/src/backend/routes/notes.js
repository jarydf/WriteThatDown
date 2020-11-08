const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Note = require("./../models/Note");

router.post("/createNote", (req, res) => {
  console.log(req.body);

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

module.exports = router;
