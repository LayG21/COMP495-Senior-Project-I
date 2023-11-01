//imports
const {roles} = require('../roles/roles');
const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:ncat\.com|aggies.ncat\.edu)$/;
//login validation middleware to be used during login
//can not trust user input so you sanitize and validate
function validateInput(req, res, next) {
    
    const userType = req.body.userType;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    
    if (!userType || !userEmail || !userPassword) {
        throw new Error('Missing form data');
    }
    if (!emailRegex.test(userEmail)) {
        throw new Error('Please login with your NCAT email');
    }
    if (userType !== roles.STUDENT && userType !== roles.ADVISOR) {
        throw new Error('Invalid user type');
    }
    //If all fields are valid, move to the next step
    next();
}

module.exports = {validateInput};