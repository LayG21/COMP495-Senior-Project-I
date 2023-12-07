//Middleware for validating and sanitizing for endpoints on advisor page
//req.body, req.params, req.query, and req.session

//imports
const { validationResult, body, query, param } = require('express-validator');

const queryvalidationRules = [
    query("searchQuery").notEmpty().trim().escape(),
]

const paramvalidationRules = [
    param("userID").notEmpty().trim().escape(),
]

//validate and sanitize 

function vsQuery(req, res, next) {
    queryvalidationRules.forEach(rule => rule(req, res, () => { }));
    next();
}

function vsParam(req, res, next) {
    paramvalidationRules.forEach(rule => rule(req, res, () => { }));
    next();
}

module.exports = { queryvalidationRules, paramvalidationRules, vsQuery, vsParam }