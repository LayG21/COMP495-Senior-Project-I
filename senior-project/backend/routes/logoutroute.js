const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");
const { validateInput } = require("../middleware/loginvalidate");
const bcrypt = require('bcrypt');
const { roles } = require("../roles/roles");
const path = require('path');

// Logout route
//works
router.get('/', (req, res) => {
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Respond with a success message or redirect if needed
      //remove cookie
      res.clearCookie('connect.sid');
      res.status(200).send('Logout successful');
    }
  });
});

module.exports = router;