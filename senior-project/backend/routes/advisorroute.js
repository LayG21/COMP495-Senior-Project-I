//imports
const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middleware/authorizationMiddleware");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { vsParam, vsQuery, paramvalidationRules, queryvalidationRules } = require("../middleware/advisorVS");
const { roles } = require("../roles/roles");
const { getStudents, getSpecificStudent, searchStudents } = require("../controllers/advisorController");



//get all assigned students
router.get("/students", isAuthenticated, isAuthorized([roles.ADVISOR]), getStudents);


//get students based on search
router.get("/students/search", queryvalidationRules, vsQuery, isAuthenticated, isAuthorized([roles.ADVISOR]), searchStudents);


//get specific assigned student by id
router.get("/students/:studentID", paramvalidationRules, vsParam, isAuthenticated, isAuthorized([roles.ADVISOR]), getSpecificStudent);


module.exports = router;
