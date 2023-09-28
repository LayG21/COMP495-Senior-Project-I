const express = require('express');
const router = express.Router();

const {openConversations,conversationMessages} = require('../../test/messages');
const {roles} = require('../roles/roles');
const {mockStudents,mockAdvisors,} = require('../../test/users');

//get page
router.get('/chat',(req,res) =>{
    res.send("Accessing chat page page");
});

//get list of users
router.get('/chat/users',(req,res) =>{
    const currentUserRole = req.user.role;

    if(currentUserRole === roles.STUDENT){
        res.send(mockAdvisors)
    }
    else if(currentUserRole === roles.ADVISOR){
        res.send(mockStudents);
    }
    else{
        res.send("Wrong user type. You can not get the list of users");
    }
})

//get messages between specified users
router.get('/chat/:user1ID/:user2ID',(req,res) =>{
    const user1ID = parseInt(req.params.user1ID);
    const user2ID = parseInt(req.params.user2ID);
    const matchedMessage = conversationMessages.find(
        (message) =>
          (message.senderID === user1ID && message.receiverID === user2ID) || 
          (message.senderID === user2ID && message.receiverID === user1ID)
      );
      if (matchedMessage) {
        res.send(matchedMessage);
      } else {
        res.status(404).send('Message not found');
      }
    //res.send("Getting message from database");
});

//add new message to database for specified users
//Note; as of now it just prints out the request
//TO DO: refactor so that messages are only sent if user exists in database
//If current user is advisor, they only have access to message students. Same for advisors
router.post('/chat/messages',(req,res) =>{
    console.log(req.body);
    res.send('Message received successfully');
});
module.exports = router;