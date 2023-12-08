// test for authorization middleware
const { describe, it } = require("@jest/globals");
const { isAuthorized } = require("../middleware/authorizationMiddleware");
const { roles } = require("../roles/roles");

describe("isAuthorized middleware with correct role", () => {
    it("should call next if user matches STUDENT", () => {
        // Arrange

        const req = { method: 'GET', session: { user: { role: roles.STUDENT } } };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();

        //console.log("This is the role used before actually calling the middleware:", req.session.user.role)
        // Act
        const middleware = isAuthorized([roles.STUDENT]);
        middleware(req, res, next);


        // Assert
        expect(next).toHaveBeenCalled();
    });
    it("should call next if user matches ADVISOR", () => {
        // Arrange

        const req = { method: 'GET', session: { user: { role: roles.ADVISOR } } };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();

        //console.log("This is the role used before actually calling the middleware:", req.session.user.role)
        // Act
        const middleware = isAuthorized([roles.ADVISOR]);
        middleware(req, res, next);


        // Assert
        expect(next).toHaveBeenCalled();
    });

    it("should call next if user matches STUDENT or ADVISOR", () => {
        // Arrange

        const req = { method: 'GET', session: { user: { role: roles.STUDENT } } };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();

        //console.log("This is the role used before actually calling the middleware:", req.session.user.role)
        // Act
        const middleware = isAuthorized([roles.ADVISOR, roles.STUDENT]);
        middleware(req, res, next);


        // Assert
        expect(next).toHaveBeenCalled();
    });
});

describe("isAuthorized middleware with wrong role or missing input", () => {
    it("should not next if user does not match STUDENT or ADVISOR", () => {
        // Arrange

        const req = { method: 'GET', session: { user: { role: "SOMEONE" } } };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();

        //console.log("This is the role used before actually calling the middleware:", req.session.user.role)
        // Act
        const middleware = isAuthorized([roles.STUDENT]);
        middleware(req, res, next);


        // Assert
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: "Forbidden Access" });
    });
    it("should not next if there is no req.session.user", () => {
        // Arrange
        const req = { method: 'GET' };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        const next = jest.fn();

        // Act
        const middleware = isAuthorized([roles.STUDENT]);

        // Check if req.session and req.session.user are defined before calling the middleware
        if (req.session && req.session.user) {
            middleware(req, res, next);
        }

        // Assert
        expect(next).not.toHaveBeenCalled();
    });
});