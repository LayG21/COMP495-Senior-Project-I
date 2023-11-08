//imports
const express = require("express");
const router = express.Router();
const { routeRoles } = require("../middleware/rolemiddleware");
const { getStudents,getSpecificStudent} = require("../controllers/advisorControlleer");

//To DO: 
//Validate and Santitize

//test get page
router.get("/advisor", (req, res) => {
  res.send("Accessing advisor view page");
});

//get all assigned students
router.get("/advisor/:id", getStudents);
/*(req, res) => {
  const advisorID = parseInt(req.params.id);
  const students = [];
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
});*/

//get specific student by id
router.get("/advisor/:id/:studentID", getSpecificStudent)
  /*(req, res) => {
  const advisorID = parseInt(req.params.id);
  const studentID = parseInt(req.params.studentID);

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
});*/
//console.log(mockStudents.length);
//console.log(mockAdvisors.length);
//console.log(mockStudents[0].advisorId);

module.exports = router;
