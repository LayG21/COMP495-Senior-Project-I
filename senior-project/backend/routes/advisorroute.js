const express = require("express");
const router = express.Router();

const { roles } = require("../roles/roles");
const { mockStudents, mockAdvisors } = require("../../test/users");

//To DO: change this to connecting to mysql
//Validate and Santitize

//test get page
router.get("/advisor", (req, res) => {
  res.send("Accessing advisor view page");
});

//test get all assigned students
router.get("/advisor/:id", (req, res) => {
  let advisorID = parseInt(req.params.id);
  let students = [];
  //look through student table
  for (let x = 0; x < mockStudents.length; x++) {
    if (mockStudents[x].advisorId === advisorID) {
      students.push(mockStudents[x]);
    }
  }
  //if students found with matching advisorID
  if (students.length > 0) {
    res.send(students);
  } else {
    res.send("No students found with matching advisorID");
  }
  console.log(req.params.id);
});

//test get specific student by id
router.get("/advisor/:id/:studentID", (req, res) => {
  let advisorID = parseInt(req.params.id);
  let studentID = parseInt(req.params.studentID);

  let selectedStudent = [];
  for (let x = 0; x < mockStudents.length; x++) {
    if (
      mockStudents[x].advisorId === advisorID &&
      mockStudents[x].id === studentID
    ) {
      selectedStudent.push(mockStudents[x]);
      break;
    }
  }

  if (selectedStudent.length > 0) {
    res.send(selectedStudent);
  } else {
    res.send("No such student found.");
  }
  console.log(`Student: ${studentID} and advisor Id: ${advisorID}`);
  // res.send("This is the response for getting a specific student");
});
//console.log(mockStudents.length);
//console.log(mockAdvisors.length);
//console.log(mockStudents[0].advisorId);

module.exports = router;
