const express = require("express");
const router = express.Router();
const { mockStudents, mockAdvisors } = require("../../test/users");

//To DO: change this to connecting to mysql
//Validate and Santitize

//get page
router.get("/student", (req, res) => {
  res.send("Accessing student profile page");
});

//get student profile
//TODO: add database
router.get("/student/:id", (req, res) => {
  const studentID = parseInt(req.params.id);
  const studentProfile = [];
  for (let x = 0; x < mockStudents.length; x++) {
    if (mockStudents[x].id === studentID) {
      studentProfile.push(mockStudents[x]);
      break;
    } else {
      continue;
    }
  }

  res.send(studentProfile);
});
module.exports = router;
