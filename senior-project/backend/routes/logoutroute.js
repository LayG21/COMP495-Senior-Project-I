const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const bcrypt = require('bcrypt');
const { logoutController } = require("../controllers/authController");
const { roles } = require("../roles/roles");
const path = require('path');

// Logout route
router.post('/logout', isAuthenticated, logoutController);

module.exports = router;