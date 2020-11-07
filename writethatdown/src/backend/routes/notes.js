const express = require("express");
const router = express.Router();

router.post("/createNote", (req, res, next) => {
  console.log(req.body);
  const newNote = new Notes({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
  });
  //save notes first
  newNote.save((err, product) => {
    if (err) {
      console.log(err);
    }
    console.log(product);
  });
});

module.exports = router;
