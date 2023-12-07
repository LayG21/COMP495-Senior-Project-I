//imports
const { roles } = require("../roles/roles");

//based on role in session
//Authorization middleware that checks if user has permission to access resource
function isAuthorized(requiredRoles) {
    return function (req, res, next) {
        const userType = req.session.user.role;
        if (!userType) {
            console.log('Error in role middleware: User type not provided.');
        }
        else if (!requiredRoles.includes(userType)) {
            console.log('Error in role middleware: User type does not match recognized roles');
            return res.status(403).json({ error: "Forbidden Access" });
        }
        else {
            console.log("User matches required role. Can move to next function.")
            next();
        }

    };
}

module.exports = { isAuthorized };
