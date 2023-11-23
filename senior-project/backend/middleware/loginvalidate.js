//imports
const { roles } = require('../roles/roles');
const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:ncat\.edu|aggies\.ncat\.edu)$/;
//login validation middleware to be used during login
//can not trust user input so you sanitize and validate
//change the way errors are thrown
function validateInput(req, res, next) {

    const userType = req.body.userType;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    //check for missing data
    if (!userType || !userEmail || !userPassword) {
        return res.status(400).send("Missing Form Data. Please Try Again");
    }
    //check for correct email used
    if (!emailRegex.test(userEmail)) {
        return res.status(400).send("Please login with your NCAT email");
    }
    //check if the correct userType was selected
    if (userType !== roles.STUDENT && userType !== roles.ADVISOR) {
        return res.status(400).send("Invalid user type");

    }
    //If all fields are valid, move to the next step
    next();
}

module.exports = { validateInput };