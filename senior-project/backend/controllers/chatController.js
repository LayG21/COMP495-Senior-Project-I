//This is the controller for the chat page
//imports
const express = require("express");
const mongoose = require("mongoose");
const {roles} = require('../roles/roles');
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");


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
module.exports = { getConversations };

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
If current user is an advisor, get all students
If current user is an student, get all advisors

openConversation: 
when you search and select or seelct a user from the sidebar, if there is a previous conversation get all messages related to this conversation.
If there isn't a conversation create a new one.The convoID could be a combination of ids such such as studentID--advisorID

saveMessage:save sent messages to database
 */

