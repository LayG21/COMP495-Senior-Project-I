//main entry point file
//import dependencies
const express = require("express");
const path = require("path");
const session = require('express-session');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const mongoose = require("mongoose");

//Port that is listening
const PORT = process.env.PORT || 3000;

//Script to populate database
//const prepopulateData = require('../senior-project/backend/scripts/prepopulateMain');

app.use(express.json());  //lets server accept json
app.use(express.urlencoded({ extended: false }));

//database connection
mongoose.connect("mongodb+srv://ghostswe:seniorghost21@cluster0.tzu8yen.mongodb.net/seniorapp?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));
console.log("Number of connections:", mongoose.connections.length);

//set static folder
//serve html,css, and js
app.use(express.static(path.join(__dirname, "../frontend")));

//script to prepopulate data
//prepopulateData();

//routes
const loginRoutes = require("./routes/loginroute.js");
const chatRoutes = require("./routes/chatroute.js");
const advisorRoutes = require("./routes/advisorroute.js");
const studentRoutes = require("./routes/studentroute.js");

//const { error } = require("console");

//allow use of routes
app.use("/", loginRoutes);
app.use("/", chatRoutes);
app.use("/", advisorRoutes);
app.use("/", studentRoutes);

//home page route
app.get("/", (req, res) => {
  res.send("Welcome");
});


//callback function after PORT
//listening on port
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
