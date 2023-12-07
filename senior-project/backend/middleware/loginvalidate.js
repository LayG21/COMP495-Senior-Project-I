//File for validating and sanitizing input
//If validated input is then sanitized
const { body } = require('express-validator');
const { roles } = require('../roles/roles');

const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:ncat\.edu|aggies\.ncat\.edu)$/;


// Sanitization rules
const sanitizationRules = [
    // Sanitize email
    body('userEmail')
        .trim()
        .escape(),

    // Sanitize password
    body('userPassword')
        .trim()
        .escape(),

    // Sanitize user type
    body('userType')
        .trim()
        .escape(),
];

// Middleware for custom validation
function validateInput(req, res, next) {
    const userType = req.body.userType;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    // Check for missing data
    if (!userType || !userEmail || !userPassword) {
        return res.status(400).send("Missing Form Data. Please Try Again");
    }

    // Check for correct email format
    if (!emailRegex.test(userEmail)) {
        return res.status(400).send("Please login with your NCAT email");
    }

    // Check if the correct userType was selected
    if (userType !== roles.STUDENT && userType !== roles.ADVISOR) {
        return res.status(400).send("Invalid user type");
    }

    // Proceed to the next step (sanitization)
    next();
}

module.exports = { sanitizationRules, validateInput };
