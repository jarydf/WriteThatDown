const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRouter = require("./routes/users");
const notesRouter = require("./routes/notes");
require("dotenv").config();

const app = express();
const port = process.env.SERVERPORT;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Add the line below, which you're missing:
require("./routes/passport-auth");
app.use("/users", usersRouter);
app.use("/notes", notesRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
