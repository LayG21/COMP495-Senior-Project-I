const express = require("express");
const router = express.Router();
const { roles } = require("../roles/roles");
const { getUsers, searchUsers, getMessages, saveSentMessage } = require("../controllers/chatController");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { isAuthorized } = require("../middleware/authorizationMiddleware");
const { queryValidationRules, paramvalidationRules, vsParam, vsQuery } = require("../middleware/chatVS");


//get users to chat with
router.get("/users", isAuthenticated, isAuthorized([roles.ADVISOR, roles.STUDENT]), getUsers);

//get users based on search
router.post("/search", queryValidationRules, vsQuery, isAuthenticated, isAuthorized([roles.ADVISOR, roles.STUDENT]), searchUsers);

//get messages between users
router.get("/messages/:userID", paramvalidationRules, vsParam, isAuthenticated, isAuthorized([roles.ADVISOR, roles.STUDENT]), getMessages);


module.exports = router;
