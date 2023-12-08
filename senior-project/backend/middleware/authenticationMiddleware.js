// middleware for checking if the user is authenticated


const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated or redirect them
    if (req.session && req.session.user) {
        next();
    } else {
        //console.log("User not authenticated, going back to login");
        res.redirect('/');
    }
};



module.exports = { isAuthenticated };