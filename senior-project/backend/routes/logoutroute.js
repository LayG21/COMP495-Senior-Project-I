const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const bcrypt = require('bcrypt');
const { roles } = require("../roles/roles");
const path = require('path');

// Logout route
router.post('/logout', isAuthenticated, (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('An error occurred during logout');
    } else {
      // Clear the session cookie
      console.log("Clearing session");
      res.clearCookie('connect.sid');

      // Redirect to the root URL
      res.redirect('/');
    }
  });
});

module.exports = router;