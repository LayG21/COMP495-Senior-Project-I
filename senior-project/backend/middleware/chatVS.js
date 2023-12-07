//Middleware for validating and sanitizing for endpoints on advisor page
//req.body, req.params, req.query, and req.session

//imports
const { validationResult, query, param } = require('express-validator');

const queryRules = [
    query("searchQuery").notEmpty().trim().escape(),
]

const paramRules = [
    param("userID").notEmpty().trim().escape(),
]

//validate and sanitize 

function vsQuery(req, res, next) {
    queryRules.forEach(rule => rule(req));
    next();
}

function vsParam(req, res, next) {
    paramRules.forEach(rule => rule(req));
    next();
}

module.exports = { queryRules, paramRules, vsQuery, vsParam }