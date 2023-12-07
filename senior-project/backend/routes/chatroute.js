const express = require("express");
const router = express.Router();
const { roles } = require("../roles/roles");
const { getUsers, searchUsers, getMessages, saveSentMessage } = require("../controllers/chatController");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const { isAuthorized } = require("../middleware/authorizationMiddleware");


//get users to chat with
router.get("/users", isAuthenticated, isAuthorized([roles.ADVISOR, roles.STUDENT]), getUsers);

//get users based on search
//Sanitize because it takes in user input
router.post("/search", isAuthenticated, isAuthorized([roles.ADVISOR, roles.STUDENT]), searchUsers);

//get messages between users
//sanitize because it takes in user input
router.get("/messages/:userID", isAuthenticated, isAuthorized([roles.ADVISOR, roles.STUDENT]), getMessages);

//send message and save it
//Sanitize because it takes in user input
router.post("/message", isAuthenticated, isAuthorized([roles.STUDENT, roles.ADVISOR]), saveSentMessage);

module.exports = router;
