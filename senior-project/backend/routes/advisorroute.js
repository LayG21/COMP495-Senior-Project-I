//imports
const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authorizationMiddleware");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { roles } = require("../roles/roles");
const { getStudents, getSpecificStudent } = require("../controllers/advisorController");
const path = require('path');

//DONE SO FAR:
//Tested route calls after applying role middleware

//To DO: 
//Validate and Santitize
//Eventually change to working with express session


//get all assigned students
router.get("/students", isAuthenticated, isAuthorized([roles.ADVISOR]), getStudents);

//get specific assigned student by id
router.get("/students/:studentID", isAuthenticated, isAuthorized([roles.ADVISOR]), getSpecificStudent);

module.exports = router;
