//imports
const roles = require("../roles/roles");

//role middleware that should be applied to certain routes
//based on role in session
function routeRoles(req, res, next,input) {
    const userType = req.body.userType;
    
    //if user type needs to match Student
    if (userType === roles.STUDENT) {
        next();
    }
    //if user type needs to match Advisor
    else if (userType === roles.ADVISOR) {
        next();
    }
    //if user type needs to match Both
    else if (userType === roles.ADVISOR || userType === roles.STUDENT) {
        next();
    }
    else {
        //responsd that the user is forbidden access
        return res.status(403).json({ message: "Forbidden Access" });
    }
}

module.export = { routeRoles };
