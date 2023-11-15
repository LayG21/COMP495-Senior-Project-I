const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");
const { validateInput } = require("../middleware/loginvalidate");
const bcrypt = require('bcrypt');
const { roles } = require("../roles/roles");
const path = require('path');

//To DO: change this to connecting to mongodb
//Validate and Santitize user input

//have to protect html page and requests made
//if they do not have a session or required role, they shouldn't be able to make a request so they can not send or put in data
//get login page
router.get("/", (req, res) => {
  const absolutePath = path.join(__dirname, '../../frontend/index.html');
  // If the user is authenticated and has the necessary role, send the HTML file
  res.sendFile(absolutePath);

});

//auth process
//I tested the validation, authentication with mockdatabase in a test project
//TO DO: add tested implmentation here

router.post('/', validateInput, async (req, res) => {
  const role = req.body.userType;
  const email = req.body.userEmail;
  const password = req.body.userPassword;

  try {
    if (userType === roles.STUDENT) {
      // Perform authentication logic for student
      // Example: Check user credentials in the database
      const student = await Student.findOne({ studentEmail: email });

      const isPasswordValid = await bcrypt.compare(
        password,
        student.studentPassword
      );

      // Assuming successful login, set user information in the session
      const user = {
        id: student.studentID,
        firstName: student.studentFirstName,
        lastName: student.studentLastName,
        role: roles.STUDENT,
      };

      req.session.user = user;

      res.send('Login Successful. Found Student with valid credentials');
    } else if (userType === roles.ADVISOR) {
      // Perform authentication logic for advisor
      // Example: Check advisor credentials in the database
      const advisor = await Advisor.findOne({ advisorEmail: email });

      const isPasswordValid = await bcrypt.compare(
        password,
        advisor.advisorPassword
      );

      // Assuming successful login, set user information in the session
      const user = {
        id: advisor.advisorID,
        firstName: advisor.advisorFirstName,
        lastName: advisor.advisorLastName,
        role: roles.ADVISOR,
      };

      req.session.user = user;

      res.status(200).send('Found Advisor with valid credentials');
    } else {
      // Handle other user types or invalid cases
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).send('Bad Request');
  }
});



module.exports = router;
