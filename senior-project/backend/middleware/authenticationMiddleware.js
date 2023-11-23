// middleware for checking if the user is authenticated
// authVerify.js

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    if (req.session && req.session.user) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, redirect to the login page or send an error response
        res.redirect('/');
    }
};

// Export the middleware function
module.exports = { isAuthenticated };