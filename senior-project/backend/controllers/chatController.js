//This is the controller for the chat page
//imports
const express = require("express");
const mongoose = require("mongoose");
const { roles } = require('../roles/roles');
//const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");

//Stored users with sockets
const userSockets = new Map();

/* For Current Idea */
//get list of advisor or students based on current user type
const getUsers = async (req, res) => {
    const userType = req.session.user.role;
    let results = null;
    try {
        //get users based on current user role
        if (userType === roles.STUDENT) {
            //give alias names as response
            //results = await Advisor.find({}).select('-_id advisorID advisorFirstName advisorLastName');
            results = await Advisor.aggregate([
                {
                    $project: {
                        _id: 0,
                        id: '$advisorID',
                        firstName: '$advisorFirstName',
                        lastName: '$advisorLastName',
                        email: '$advisorEmail',
                    },
                },
            ]);
            //console.log(results);
        }
        else if (userType === roles.ADVISOR) {
            //results = await Student.find({}).select('-_id studentID studentFirstName studentLastName');
            results = await Student.aggregate([
                {
                    $project: {
                        _id: 0,
                        id: '$studentID',
                        firstName: '$studentFirstName',
                        lastName: '$studentLastName',
                        email: '$studentEmail',
                    },
                },
            ]);
            //console.log(results);
        }
        //check if they are neither role or if role is empty
        else if (!userType || (userType !== roles.STUDENT && userType !== roles.ADVISOR)) {
            return res.status(401).json({ msg: "Invalid User Type" });
        }
        //check if anything was found
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        //if found send results back
        return res.status(200).json({ success: true, data: results });
    } catch (error) {
        //error Message
        console.error(error);
        return res.status(500).json({ message: 'An error occured.' });
    }
}

//get messages between two users
const getMessages = async (req, res) => {
    //would need the sender and receiver
    const currentUser = req.session.user.id;
    const selectedUser = req.params.userID;
    try {
        //check if request is empty
        if (!currentUser || !selectedUser) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        //if not empty get the messages
        const messages = await Message.find({
            $or: [
                { senderID: currentUser, receiverID: selectedUser },
                { senderID: selectedUser, receiverID: currentUser },
            ],
        }).select('-_id').sort({ createdAt: -1 });
        //send back messages if there are any
        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: 'No Messages Found' });
        }
        return res.status(200).json(messages);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An Error Occured' });
    }
}

//save sent messages
//Will change this to work with socket io
const saveSentMessage = async (req, res) => {
    //need sender,receiver, and content
    const sender = req.session.user.id;
    const receiver = req.body.receiver;
    const content = req.body.content;
    let data = {};
    try {
        //check if request is empty
        if (!sender || !receiver || !content) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        //create new message object to be saved in db
        data = {
            senderID: sender,
            receiverID: receiver,
            content,
        }
        //save message to database
        const newMessage = await Message.create(data);

        //check if message was successfully saved
        if (!newMessage) {
            return res.status(500).json({ message: 'Failed to save message.' })
        }
        return res.status(200).json({ success: true, newMessage });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An Error Occured' });
    }
}


//search through advisors if current user is a student
//search through students if current user is advisor
//To do: implement search
const searchUsers = async (req, res) => {
    const role = req.session.user.role;
    const searchQuery = req.query.searchQuery;
    let searchResults = [];
    try {
        if (role === roles.STUDENT) {
            searchResults = await Advisor.find({
                $or: [
                    { advisorFirstName: { $regex: new RegExp(searchQuery, 'i') } },
                    { advisorLastName: { $regex: new RegExp(searchQuery, 'i') } },
                ],
            },
                { advisorID: 1, advisorFirstName: 1, advisorLastName: 1, _id: 0 }
            ).limit(5);
        }
        else if (role === roles.ADVISOR) {
            searchResults = await Student.find({
                $or: [
                    { studentFirstName: { $regex: new RegExp(searchQuery, 'i') } },
                    { studentLastName: { $regex: new RegExp(searchQuery, 'i') } },
                ],
            },
                { studentID: 1, studentFirstName: 1, studentLastName: 1, _id: 0 }
            ).limit(5);
        }

        //if empty return nothing but the status

        if (searchResults.length === 0) {
            return res.status(204).json();
        }

        //format response
        const formattedResponse = searchResults.map(result => ({
            id: result.studentID || result.advisorID,
            firstName: result.studentFirstName || result.advisorFirstName,
            lastName: result.studentLastName || result.advisorLastName,
        }));
        res.status(200).json(formattedResponse);
    } catch (error) {
        console.log('Error in Search Users Controller');
        res.status(500).json({ message: error.message })
    }

}
//socket io logic for sending and receiving messages
const initializeSocketIO = (io, sessionMiddleware) => {
    // Socket.IO connection setup with session middleware
    io.engine.use(sessionMiddleware);

    io.on('connection', (socket) => {
        const { user } = socket.request.session;

        if (user && user.id) {
            userSockets.set(user.id, socket);
            console.log(`User ${user.id} connected. This is their socket id: ${socket.id}`);
        }

        else {
            console.log('User information not available.');
        }

        socket.on('sendMessage', ({ receiverId, content }) => {
            const senderId = socket.request.session.user.id;

            const receiverSocket = userSockets.get(parseInt(receiverId, 10));

            //save message first and then emit to user if they have a socket
            //console.log(`Received message from ${senderId} to ${receiverId}: ${content}`);
            //console.log(`This is the socket of the receiverID ${receiverSocket}`);

            if (receiverSocket) {
                //Emit message to specific socket
                console.log(`Receiver socket found for ${receiverId}: ${receiverSocket.id}`);
                receiverSocket.emit('newMessage', { senderId, content });
            }
            else {
                console.log(`Receiver ${receiverId} not found or does not have an active socket.`);
            }
        });
        socket.on('disconnect', () => {
            if (user && user.id) {
                userSockets.delete(user.id);
                console.log(`Socket removed from userSockets Map for user ${user.id}`);
            }
            console.log(`User ${socket.id} disconnected`);
        });
    });
}

/*io.on('connection', (socket) => {
    console.log('a user connected');
});*/
module.exports = { getUsers, searchUsers, getMessages, saveSentMessage, initializeSocketIO };


/*
For original implementation
//get all users the current user has conversation with
const getConversations = async (req, res) => {
    const userID = req.body.id;
    const userType = req.body.userType;
    console.log(userID);
    console.log(userType);

    try {
        let results = null;
        let fieldToExtract = null;

        if (userType === roles.STUDENT) {
            results = await Conversation.find({ student: userID })
                .populate('advisor', '_id advisorFirstName advisorLastName')
                .select('-_id -student');
            fieldToExtract = 'advisor';
        }
        else if (userType === roles.ADVISOR) {
            results = await Conversation.find({ advisor: userID })
                .populate('student', '_id studentFirstName studentLastName')
                .select('-_id -advisor');
            fieldToExtract = 'student';
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No Conversations Found For User' });
        }

        // The populated fields should already contain the necessary information
        const modifiedResponse = results.map(result => result[fieldToExtract]);
        res.status(200).json(modifiedResponse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

//might need to use regex
const searchUser = async (req, res) => {
    try {
        //if student:
        //search for advisors where the first name and advsior slightly match
        //return results as the advisorid, firstname, and last name
        if (userType === roles.STUDENT) { }
        else if(userType === roles.ADVISOR){}
        //else if advisor:
        //search for advisors where the first name and advsior slightly match
        //return results as the advisorid, firstname, and last name
        //could update to handle case where not stydent or advisor
    } catch (error) {

    }
};
const openConversation = async (req, res) => {
    //get who the requester is
    //get who the selected user is
    //if there is a previous conversation, return all messages from that conversation
    //If there is no previous conversation, create a new conversation

    try {

    } catch (error) {

    }
};

const saveMessage = async (req, res) => {
    //save message to db
    //will need senderId, receiverId, content, and convoId
};
module.exports = { getConversations };*/

//create a function that creates convoId as student--advisor
/*
let convoID = null;
let userIsStudent = false;
let userIsAdvisor = false;
*/
//things to do
/* Original Idea*/
/*
getConversations: Gets people that current user has conversations with. 
If current user is a student, should return whoever is the advisor.
If currnt user is advisor, should rturn whoever is student

searchUser: search for users that might slightly match the input. 
Returning the people that slightly match the input.
If they are an advisor, they should only be searching for students
If they are students, they should only be looking for advisors

openConversation: when you search and select someone to chat with: 
if there is a previous conversation with current user and selected user, get all messages from this conversation
if there is no conversation, create a new one. The convoID could be a combination of ids such such as studentID--advisorID

saveMessage: Save messages sent messages in database
*/

/*Current Idea */
/*
getUsers: 
get list of users that current user can chat with
If current user is an advisor, get all students
If current user is an student, get all advisors

searchUser:
Searches through list of users that current user can chat with
If they are an advisor, they should only be searching for students
If they are students, they should only be looking for advisors

getMessages:
get all messages between two users, the two users being the current user and other user

saveMessage:save sent messages to database
 */

