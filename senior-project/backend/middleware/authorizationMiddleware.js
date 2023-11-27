//imports
const roles = require("../roles/roles");

//role middleware that should be applied to certain routes
//based on role in session
//Authorization middleware that checks if user has permission to access resource
function isAuthorized(requiredRoles) {
    return function (req, res, next) {
        // Check if req.session and req.session.user are defined
        if (!req.session || !req.session.user) {
            console.log('Error in role middleware: User not authenticated.');
            return res.status(401).json({ error: "Unauthorized" });
        }
        const userType = req.session.user.role;
        //console.log('User Type:', userType);
        //console.log('Required Roles:', requiredRoles);
        if (!userType) {
            console.log('Error in role middleware: User type not provided.');
            return res.status(400).json({ error: "Bad Request: User type not provided." });
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
