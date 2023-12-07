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

    console.log(userType);
    console.log(userEmail);
    console.log(userPassword);

    let validationErrors = [];

    // Check for missing data first and tell the user
    if (!userType || !userEmail || !userPassword) {
        validationErrors.push("Missing Form Data. Please Try Again");
    }
    //if no mising data, check what the data is
    else {
        // Check email format
        if (!emailRegex.test(userEmail)) {
            validationErrors.push("Please login with your NCAT email");
        }

        // Check user type
        if (userType !== roles.STUDENT && userType !== roles.ADVISOR) {
            validationErrors.push("Please select a valida userType");
        }
    }

    // If there are any errors, return the response
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }


    // If all checks pass, proceed to the next step (sanitization)
    next();
}

module.exports = { sanitizationRules, validateInput };
