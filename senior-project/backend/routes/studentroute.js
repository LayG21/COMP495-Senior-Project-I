const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/studentController");
const { roles } = require("../roles/roles");
const { isAuthorized } = require("../middleware/authorizationMiddleware");
const path = require('path');

// get page

//get student profile
router.get("/profile", isAuthorized([roles.STUDENT]), getProfile);



module.exports = router;
