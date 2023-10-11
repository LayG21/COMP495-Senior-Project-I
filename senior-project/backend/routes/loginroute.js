const express = require("express");
const router = express.Router();

const { validateInput } = require("../middleware/loginvalidate");
const { roles } = require("../roles/roles");
const { mockStudents, mockAdvisors } = require("../../test/users");

//To DO: change this to connecting to mysql
//Validate and Santitize

//test for querying mockdatabases
function findStudent(stuEmail, stuPassword) {
  let found = false;
  for (let x = 0; x < mockStudents.length; x++) {
    if (
      mockStudents[x].email === stuEmail &&
      mockStudents[x].password === stuPassword
    ) {
      found = true;
      break;
    } else {
      continue;
    }
  }
  return found;
}
function findAdvisor(advEmail, advPassword) {
  let found = false;
  for (let x = 0; x < mockAdvisors.length; x++) {
    if (
      mockAdvisors[x].email === advEmail &&
      mockAdvisors[x].password === advPassword
    ) {
      found = true;
      break;
    } else {
      continue;
    }
  }
  return found;
}
//get login page
router.get("/login", (req, res) => {
  res.send("Accessing login page");
});

//auth process
//I tested the validation, authentication with mockdatabase in a test project
//TO DO: add tested implmentation here

router.post("/login", validateInput, (req, res) => {
  const userType = req.body.userType;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  try {
    if (userType === roles.STUDENT && findStudent(userEmail, userPassword)) {
      //print out user info if thre is a match
      console.log("User Type:", userType);
      console.log("User Email:", userEmail);
      console.log("User Password:", userPassword);

      res.send("Found Student with valid credntials");
    } else if (
      userType === roles.ADVISOR &&
      findAdvisor(userEmail, userPassword)
    ) {
      //print out user info if there is a match
      console.log("User Type:", userType);
      console.log("User Email:", userEmail);
      console.log("User Password:", userPassword);

      res.send("Found Advisor with valid crdentials");
    } else {
      throw new Error(
        "No existing user with these credentials. Make sure password,email, and userType are correct."
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
