const { describe, it } = require("@jest/globals");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");

describe("isAuthenticated middlware", () => {
    it("Should call next if user is authenticated", () => {
        // Arrange
        let req = { method: 'GET', session: { user: 'authenticatedUser' } };
        let res = { redirect: jest.fn() };
        let next = jest.fn();

        //Act

        isAuthenticated(req, res, next);

        //Assert

        expect(next).toHaveBeenCalled();
    });
    it("Should redirect to login page if user is not authenticated", () => {
        // Arrange
        let req = { method: 'GET', session: {} };
        let res = { redirect: jest.fn() };
        let next = jest.fn();

        //Act
        isAuthenticated(req, res, next);

        //Assert
        expect(next).not.toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith("/");

    });
})