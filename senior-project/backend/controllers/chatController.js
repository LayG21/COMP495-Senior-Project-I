//This is the controller for the chat page
//imports
const express = require("express");
const mongoose = require("mongoose");
const {roles} = require('../roles/roles');
//const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");

/* For Current Idea */

const getUsers = async (req, res) => {
    const userType = req.body.userType;
    let results = null;
    try {
        //get users based on current user role
        if (userType === roles.STUDENT) {
            results = await Advisor.find({}).select('_id advisorFirstName advisorLastName');
            //console.log(results);
        }
        else if (userType === roles.ADVISOR) {
            results = await Student.find({}).select('_id studentFirstName studentLastName');
            //console.log(results);
        }
        //check if they are neither role or if role is empty
        else if (userType !== roles.STUDENT || userType !== roles.ADVISOR || userType === null) {
            return res.status(401).json({msg: "Invalid User Type"});
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
        return res.status(500).json({ message:'An error occured.' });
    }
}

//get messages between two users
const getMessages = async (req, res) => {
    //would need the sender and receiver
    const currentUser = req.body.id;
    const otherUser = req.params.userID;
    try {
        //check if request is empty
        if (!currentUser || !otherUser) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        //if not empty get the messages
        const messages = await Message.find({
            $or: [
                { sender: currentUser, receiver: otherUser },
                { sender: otherUser, receiver: currentUser },
      ],
        }).sort({ createdAt: -1 });
        //send back messages if there are any
        if (!messages || messages.length === 0) {
            return res.status(401).json({message:'No Messages Found'});
        }
        return res.status(200).json(messages);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message:'An Error Occured'});
    }
   


    
}

//save sent messages
const saveSentMessage = async (req, res) => { 
    //need sender,receiver, and content
    const { sender, receiver, content } = req.body;
    let data = {};
    try {
        //check if request is empty
        if (!sender || !receiver || !content) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        //create new message object to be saved in db
        data = {
            sender,
            receiver,
            content,
        }
        //save message to database
        const newMessage = await Message.create(data);

        //check if message was successfully saved
        if (!newMessage) {
            return res.status(500).json({message:'Failed to save message.'})
        }
        return res.status(200).json({ success: true, newMessage});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An Error Occured' });
    }
}



const searchUsers = async (req, res) => {
    const query = req.query.searchQuery;
}
module.exports = { getUsers,searchUsers,getMessages,saveSentMessage};


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
