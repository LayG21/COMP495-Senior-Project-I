const { body, validationResult } = require('express-validator');

// Mock the body method
const bodyMock = jest.fn();

// Mock the validationResult method
const validationResultMock = jest.fn();

module.exports = {
    bodyMock,
    validationResultMock,
};



