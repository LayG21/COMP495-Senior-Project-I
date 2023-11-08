const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/studentController");
const { routeRoles } = require("../middleware/rolemiddleware");

//To DO: 
//Validate and Santitize

//get page
router.get("/student", (req, res) => {
  res.send("Accessing student profile page");
});

//get student profile

router.get("/student/:id",getProfile);

/*
Old route for test database
router.get("/student/:id",getProfile (req, res) => {
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
});*/
module.exports = router;
