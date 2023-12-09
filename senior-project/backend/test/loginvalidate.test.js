const { describe, it, expect } = require('@jest/globals');
//const { validationResultMock, bodyMock } = require('./express-validator.mock');
const { sanitizationRules, validateInput } = require('../middleware/loginvalidate'); // Replace with the correct path

// Mock Express request and response objects
beforeEach(() => {
    // Reset request and response objects before each test
    req = {
        body: {
            userType: 'STUDENT',
            userEmail: 'test@ncat.edu',
            userPassword: 'testPassword',
        },
    };

    res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        send: jest.fn(),
    };
});

// Test the sanitization rules
describe('Sanitization Rules', () => {
    it('should sanitize email, password, and userType', () => {
        sanitizationRules.forEach(rule => {
            rule(req, res, () => { });
        });

        expect(req.body.userEmail).toBe('test@ncat.edu');
        expect(req.body.userPassword).toBe('testPassword');
        expect(req.body.userType).toBe('STUDENT');
    });
});

// Test the custom validation middleware
describe('Custom Validation Middleware', () => {
    it('should pass validation for correct input', () => {
        validateInput(req, res, () => { });
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    it('should return 400 for missing form data', () => {
        const invalidReq = { body: {} };
        validateInput(invalidReq, res, () => { });
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 400 for invalid email format', () => {
        req.body.userEmail = 'invalidemail@example.com';
        validateInput(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 400 for invalid user type', () => {
        req.body.userType = 'INVALID_TYPE';
        validateInput(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
