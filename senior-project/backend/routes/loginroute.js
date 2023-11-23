const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");
const { loginController } = require("../controllers/authController");
const { validateInput } = require("../middleware/loginvalidate");
const bcrypt = require('bcrypt');
const { roles } = require("../roles/roles");
const path = require('path');

//Validate and Santitize user input

//have to protect html page and requests made
//if they do not have a session or required role, they shouldn't be able to make a request so they can not send or put in data
//get login page
router.get("/", (req, res) => {
  const absolutePath =
    // If the user is authenticated and has the necessary role, send the HTML file
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));

});


//post request for when user adds credentials ad presses login
router.post('/login', validateInput, loginController);




module.exports = router;
