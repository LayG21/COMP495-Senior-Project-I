const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/studentController");
const { roles } = require("../roles/roles");
const { isAuthorized } = require("../middleware/authorizationMiddleware");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");

const path = require('path');

// get page

//get student profile
router.get("/profile", isAuthenticated, isAuthorized([roles.STUDENT]), getProfile);

module.exports = router;
