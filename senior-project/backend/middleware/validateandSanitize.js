//General middleware for validating ad sanitizing where endpoints use the following:
//req.body, req.params, req.query, and req.session

//imports
const { validationResult, body, query, param } = require('express-validator');

const bodyvalidationRules = [
    body().notEmpty().trim().escape(),
]
const queryvalidationRules = [
    query().notEmpty().trim().escape(),
]

const paramvalidationRules = [
    param().notEmpty().trim().escape(),
]

//validate and sanitize 
function vsBody(req, res, next) {

    bodyvalidationRules.forEach(rule => rule(req, res, () => { }));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

function vsQuery(req, res, next) {
    queryvalidationRules.forEach(rule => rule(req, res, () => { }));
}

function vsParam(req, res, next) {
    paramvalidationRules.forEach(rule => rule(req, res, () => { }));
}

module.exports = { vsBody, vsQuery, vsParam }