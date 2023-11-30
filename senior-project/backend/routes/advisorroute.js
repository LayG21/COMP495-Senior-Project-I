//imports
const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authorizationMiddleware");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { roles } = require("../roles/roles");
const { getStudents, getSpecificStudent, searchStudents } = require("../controllers/advisorController");
const path = require('path');

//DONE SO FAR:
//Tested route calls after applying role middleware

//To DO: 
//Validate and Santitize



//get all assigned students
//This does not take in user input, this takes in session information managed on the server side
router.get("/students", isAuthenticated, isAuthorized([roles.ADVISOR]), getStudents);

//get students based on search
//sanitize because this takes in user input
router.get("/students/search", isAuthenticated, isAuthorized([roles.ADVISOR]), searchStudents);


//get specific assigned student by id
//Sanitize because this takes in user input
router.get("/students/:studentID", isAuthenticated, isAuthorized([roles.ADVISOR]), getSpecificStudent);


module.exports = router;
