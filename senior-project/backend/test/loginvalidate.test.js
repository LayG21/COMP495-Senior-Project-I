const { describe, it, expect } = require('@jest/globals');
const { validationResultMock, bodyMock } = require('./express-validator.mock');
const { validationRules, validateAndSanitizeInput } = require('../middleware/loginvalidate');




describe("test for correct input", () => {
    describe("should return go to next for successful validation", () => {
        it('should apply validation rules and proceed to next middleware when input is valid', () => {
            const req = {
                body: {
                    userEmail: 'test@aggies.ncat.edu',
                    userPassword: 'password',
                    userType: 'STUDENT'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            validateAndSanitizeInput(req, res, next);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
        });
    });
});

describe("test for missing input", () => {
    describe("should return 400 and errors", () => {
        it('should apply validation rules and proceed to next middleware when input is valid', () => {
            const req = {
                body: {
                    userEmail: 'test',
                    userPassword: 'password',
                    userType: 'STUDENT'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            validateAndSanitizeInput(req, res, next);

            //expect(res.status).toBe(200);
            //expect(res.json).toHaveBeenCalled();
            expect(next).not.toHaveBeenCalled();
        });
    });
});
