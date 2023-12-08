const express = require("express");
const router = express.Router();

//endpoint for getting role
const isAuthenticatedForUserRole = (req, res, next) => {
    // Check if the user is authenticated or send an error response
    if (req.session && req.session.user) {
        next();
    } else {
        console.log("User not authenticated for /user/role");
        res.status(401).json({ error: "Unauthorized" });
    }
};

// Route to get user role using the dedicated middleware
router.get("/user/role", isAuthenticatedForUserRole, (req, res) => {
    const userRole = req.session.user.role;

    if (userRole) {
        res.status(200).json({ role: userRole });
    } else {
        console.log("User has no role");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;