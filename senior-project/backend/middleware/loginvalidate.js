const { validationResult, body } = require('express-validator');
const { roles } = require('../roles/roles');

const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:ncat\.edu|aggies\.ncat\.edu)$/;

// Define your validation and sanitation rules so it can be looked through
const validationRules = [
    // validate and sanitize email
    body('userEmail')
        .notEmpty().withMessage('Email is required')
        .custom(value => {
            if (!emailRegex.test(value)) {
                throw new Error('Please login with your NCAT email');
            }
            return true;
        })
        .trim()
        .escape(),

    // validate and sanitize password
    body('userPassword')
        .notEmpty().withMessage('Password is required')
        .trim()
        .escape(),

    // validate and sanitize user type
    body('userType')
        .notEmpty().withMessage('User type not defined')
        .custom(value => {
            if (value !== roles.STUDENT && value !== roles.ADVISOR) {
                throw new Error('Invalid user type');
            }
            return true;
        })
        .trim()
        .escape(),
];

// Create a middleware function using the defined validation rules
function validateAndSanitizeInput(req, res, next) {
    // Apply validation rules
    // Check for validation errors
    validationRules.forEach(rule => rule(req, res, () => { }));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // No validation errors, proceed to the next middleware (login controller)
    next();
}

module.exports = { validationRules, validateAndSanitizeInput };
