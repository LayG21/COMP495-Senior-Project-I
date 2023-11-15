//NOTE: Would have to change all requests to be done with express session
//main entry point file
//import dependencies
const express = require("express");
const app = express();
const session = require('express-session');
const http = require('http');
const mongoose = require("mongoose");
const socketIO = require('socket.io');
const path = require("path");
const server = http.createServer(app);

//import middleware
const { isAuthenticated } = require("./middleware/authenticationMiddleware.js");

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
app.use(session({
  secret: 'your-secret-key', // Change this to a strong, secret key
  resave: false,
  saveUninitialized: false,
}));

//routes
const loginRoutes = require("./routes/loginroute.js");
const chatRoutes = require("./routes/chatroute.js");
const advisorRoutes = require("./routes/advisorroute.js");
const studentRoutes = require("./routes/studentroute.js");
//const logoutRoutes = require("./routes/logoutroute.js");



//allow use of routes
app.use("/", loginRoutes);
app.use("/chat", chatRoutes);
app.use("/advisor", advisorRoutes);
app.use("/student", studentRoutes);



//logout endpoint
app.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('An error occurred during logout');
    } else {
      // Clear the session cookie
      res.clearCookie('connect.sid'); // Replace 'your-session-cookie' with the name of your session cookie

      // End the response to ensure session changes are saved
      res.status(200).end();
    }
  });
});
// protect the html pages except fot the login

//get home.html
app.get("/home.html", isAuthenticated, (req, res) => {
  console.log("reached the home page");
  res.sendFile(path.join(__dirname, "../frontend/home.html"));
});

//get chat.html
app.get("/chat.html", isAuthenticated, (req, res) => {
  console.log("reached the chat page");
  console.log(req.session.user);
  res.sendFile(path.join(__dirname, "../frontend/chat.html"));
});
//get advisor.html 
app.get('/advisor.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/advisor.html"));
});
//get student.html 
app.get('/student.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/student.html"));
});

app.get('/gpa-calculator.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/gpa-calculator.html"));
});

app.get('/course-calculator.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/course-calculator.html"));
});

app.get('/class-generator.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/class-generator.html"));
});




//moved to bottomh to make sure it works
//set static folder
//serve html,css, and js
app.use(express.static(path.join(__dirname, "../frontend")));


//callback function after PORT
//listening on port
server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
});
