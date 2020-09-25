const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const passport = require("passport");
const usersRouter = require('./routes/users');
require('dotenv').config();

const app = express();
const port = process.env.SERVERPORT;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Passport middleware
// app.use(passport.initialize());

// // Passport config
// require("./routes/passport")(passport);

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
