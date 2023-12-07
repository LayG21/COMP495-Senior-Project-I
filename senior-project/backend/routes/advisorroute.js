//imports
const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authorizationMiddleware");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { vsParam, vsQuery, paramvalidationRules, queryvalidationRules } = require("../middleware/advisorVS");
const { roles } = require("../roles/roles");
const { getStudents, getSpecificStudent, searchStudents } = require("../controllers/advisorController");

//DONE SO FAR:
//Tested route calls after applying role middleware

//To DO: 
//Validate and Santitize



//get all assigned students
//This does not take in user input, this takes in session information managed on the server side
router.get("/students", isAuthenticated, isAuthorized([roles.ADVISOR]), getStudents);

//sanitization middleware works as long as there is input

//get students based on search
router.get("/students/search", queryvalidationRules, vsQuery, isAuthenticated, isAuthorized([roles.ADVISOR]), searchStudents);


//get specific assigned student by id
router.get("/students/:studentID", paramvalidationRules, vsParam, isAuthenticated, isAuthorized([roles.ADVISOR]), getSpecificStudent);


module.exports = router;
