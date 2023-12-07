const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");
const { sanitizationRules, validateInput } = require("../middleware/loginvalidate");
const { loginController } = require("../controllers/authController");
const path = require('path');
const { validationResult } = require("express-validator");

router.use(express.json());

//get login page
router.get("/", (req, res) => {
  const absolutePath =
    // If the user is authenticated and has the necessary role, send the HTML file
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));

});


//post request for when user adds credentials ad presses login
router.post('/login', validateInput, sanitizationRules, loginController);





module.exports = router;
