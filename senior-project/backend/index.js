//NOTE: Would have to change all requests to be done with express session
//main entry point file
//import dependencies
const express = require("express");
const app = express();
const session = require('express-session');
const path = require("path");
const mongoose = require("mongoose");

//imports for socket io
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

//import list of roles
const { roles } = require("./roles/roles.js");

//import middleware 
//middleware to protect routes

const { isAuthenticated } = require("./middleware/authenticationMiddleware.js");
const { isAuthorized } = require("./middleware/authorizationMiddleware.js");

//import chatController.js which has socket and chat functions in it
const chatController = require("./controllers/chatController.js");




//Port that is listening
const PORT = process.env.PORT || 3000;

//Script to populate database
//const prepopulateData = require('./scripts/prepopulateMain');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//database connection
mongoose.connect("mongodb+srv://ghostswe:seniorghost21@cluster0.tzu8yen.mongodb.net/seniorapp?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));
console.log("Number of connections:", mongoose.connections.length);


//script to prepopulate data
//prepopulateData();

//session middleware
const sessionMiddleware = session({
  secret: "changeit",
  resave: true,
  saveUninitialized: false,
});

//use session middleware
app.use(sessionMiddleware);

//routes
const loginRoutes = require("./routes/loginroute.js");
const logoutRoutes = require("./routes/logoutroute.js");
const chatRoutes = require("./routes/chatroute.js");
const advisorRoutes = require("./routes/advisorroute.js");
const studentRoutes = require("./routes/studentroute.js");




//allow use of routes
app.use("/", loginRoutes);
app.use("/", logoutRoutes);
app.use("/chat", chatRoutes);
app.use("/advisor", advisorRoutes);
app.use("/student", studentRoutes);





// protect the actual html pages except for the login

//get home.html
app.get("/home.html", isAuthenticated, isAuthorized([roles.STUDENT, roles.ADVISOR]), (req, res) => {
  //console.log("reached the home page");
  res.sendFile(path.join(__dirname, "../frontend/home.html"));
});

//get chat.html
//removed so i can edit
app.get("/chat.html", isAuthenticated, isAuthorized([roles.STUDENT, roles.ADVISOR]), (req, res) => {
  // console.log("reached the chat page");
  res.sendFile(path.join(__dirname, "../frontend/chat.html"));
});
//get advisee-view.html 
app.get('/advisee-view.html', isAuthenticated, isAuthorized([roles.ADVISOR]), (req, res) => {
  //console.log("reached the advisee-view page");
  res.sendFile(path.join(__dirname, "../frontend/advisee-view.html"));
});
//get student-profile.html 
app.get('/student-profile.html', isAuthenticated, isAuthorized([roles.STUDENT]), (req, res) => {
  //console.log("reached the student profile page");
  res.sendFile(path.join(__dirname, "../frontend/student-profile.html"));
});

app.get('/gpa-calculator.html', isAuthenticated, isAuthorized([roles.STUDENT, roles.ADVISOR]), (req, res) => {
  //console.log("reached the gpa calculator page");
  res.sendFile(path.join(__dirname, "../frontend/gpa-calculator.html"));
});

app.get('/course-calculator.html', isAuthenticated, isAuthorized([roles.STUDENT, roles.ADVISOR]), (req, res) => {
  //console.log("reached the course calculator page");
  res.sendFile(path.join(__dirname, "../frontend/course-calculator.html"));
});

//I am not sure about the roles for this page
app.get('/class-generator.html', isAuthenticated, (req, res) => {
  //console.log("reached the class generator page");
  res.sendFile(path.join(__dirname, "../frontend/class-generator.html"));
});




//moved to bottom to make sure it works
//stops from serving pages until they are checked for authentication and authroization
//serve html,css, and js
app.use(express.static(path.join(__dirname, "../frontend")));

//add socket io middleware to associate the user with the session
chatController.initializeSocketIO(io, sessionMiddleware);


//listening on port
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
