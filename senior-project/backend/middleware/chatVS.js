// Middleware for validating and sanitizing for endpoints on advisor page
// req.body, req.params, req.query, and req.session

// imports
const { query, param, validationResult } = require('express-validator');

const queryRules = [
    query("searchQuery").notEmpty().trim().escape(),
];

const paramRules = [
    param("userID").notEmpty().trim().escape(),
];

// validate and sanitize

function vsQuery(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

function vsParam(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = { queryRules, paramRules, vsQuery, vsParam };

