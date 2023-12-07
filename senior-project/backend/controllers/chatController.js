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
    const currentUser = parseInt(req.session.user.id);
    const selectedUser = parseInt(req.params.userID);
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
        }).select('-_id -__v').sort({ createdAt: 1 });
        //send back messages if there are any
        if (!messages || messages.length === 0) {
            return res.status(204).json();
        }
        return res.status(200).json(messages);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An Error Occured' });
    }
}

//save sent messages
//Will change this to work with socket io
const saveSentMessage = async (senderID, receiverID, message) => {
    //need sender,receiver, and content
    const sender = senderID;
    const receiver = receiverID;
    const content = message;
    let data = {};
    try {
        if (!sender || !receiver || !content) {
            console.log("Input was missing for saving the message");
            return 400;
        }
        //create new message object to be saved in db
        data = {
            senderID: sender,
            receiverID: receiver,
            content: content,
        }
        //save message to database
        const newMessage = await Message.create(data);

        //check if message was successfully saved
        if (!newMessage) {
            console.log("error in function for saving the message");
            return 500;
        }
        return 200;

    } catch (error) {
        console.error(error);
        return 500;
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
        res.status(500).json({ message: error.message + "server" })
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
            // console.log('Current userSockets map:', userSockets);

        } else {
            //console.log('User information not available.');
        }

        //sending message
        socket.on('sendMessage', async ({ receiverID, content }) => {
            const senderID = parseInt(socket.request.session.user.id);
            const receiverSocket = userSockets.get(parseInt(receiverID, 10));

            console.log(`Received message from ${senderID} to ${receiverID}: ${content}`);
            console.log(`This is the socket of the receiverID ${receiverSocket}`);

            //save message before emitting and if not saved do no emit message
            let saveResult = await saveSentMessage(senderID, receiverID, content);


            if (saveResult === 200) {
                if (receiverSocket) {
                    console.log(`Receiver socket found for ${receiverID}: ${receiverSocket.id}`);
                    io.to(receiverSocket.id).emit('receiveMessage', ({ senderID, content }));
                }

            } else {
                console.log(`Message not saved or receiver ${receiverID} not found or does not have an active socket.`);
                // Handle the case where the message is not saved or receiver not found
                socket.emit('errorMessage', { error: 'Message could not be sent.' });
            }

        });

        socket.on('disconnect', () => {
            if (user && user.id) {
                userSockets.delete(user.id);
                console.log(`Socket removed from userSockets Map for user ${user.id}`);
            }
            console.log(`User ${socket.id}, disconnected`);
        });
    });

}
module.exports = { getUsers, searchUsers, getMessages, saveSentMessage, initializeSocketIO };


