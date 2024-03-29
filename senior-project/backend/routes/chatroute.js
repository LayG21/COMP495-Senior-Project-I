const express = require("express");
const { queryRules, paramRules, vsParam, vsQuery } = require("../middleware/chatVS");
const router = express.Router();
const { roles } = require("../roles/roles");
const { getUsers, searchUsers, getMessages } = require("../controllers/chatController");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { isAuthorized } = require("../middleware/authorizationMiddleware");



//get users to chat with
router.get("/users", isAuthenticated, isAuthorized([roles.ADVISOR, roles.STUDENT]), getUsers);

//get users based on search
router.post("/search", queryRules, vsQuery, isAuthenticated, isAuthorized([roles.ADVISOR, roles.STUDENT]), searchUsers);

//get messages between users
router.get("/messages/:userID", paramRules, vsParam, isAuthenticated, isAuthorized([roles.ADVISOR, roles.STUDENT]), getMessages);


module.exports = router;
