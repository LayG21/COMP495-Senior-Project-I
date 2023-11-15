//imports
const express = require("express");
const router = express.Router();
const { roleMiddleware, isAuthorized } = require("../middleware/authorizationMiddleware");
const { roles } = require("../roles/roles");
const { getStudents, getSpecificStudent } = require("../controllers/advisorControlleer");
const path = require('path');

//DONE SO FAR:
//Tested route calls after applying role middleware

//To DO: 
//Validate and Santitize
//Eventually change to working with express session

//get page
router.get("/", (req, res) => {
  return res.sendFile("/Users/ladylynai/COMP495-Senior-Project-I/senior-project/frontend/advisor.html");
});

//get all assigned students
router.get("/students", isAuthorized([roles.ADVISOR]), getStudents);

//get specific assigned student by id
router.get("/students/:studentID", isAuthorized([roles.ADVISOR]), getSpecificStudent);

module.exports = router;
