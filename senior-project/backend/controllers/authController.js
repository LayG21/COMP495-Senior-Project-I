//imports
//Controller or business logic for logging in and logging out
const express = require('express');
const Student = require("../models/Student.js");
const Advisor = require("../models/Advisor");
const { roles } = require("../roles/roles.js");
const bcrypt = require('bcrypt');

//this takes input as a the body with the type being string
const loginController = async (req, res) => {
    const role = req.body.userType;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    let user = null;
    try {

        if (role === roles.STUDENT) {
            const student = await Student.findOne({ studentEmail: email });
            if (!student) {
                console.log("No User with matching Email");
                return res.status(404).json({ error: 'No User with Matching Credentials' });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                student.studentPassword
            );

            if (!isPasswordValid) {
                console.log("No user with matching password");
                return res.status(401).json({ error: 'No User With Matching Credentials' });
            }

            // Assuming successful login, set user information in the session
            user = {
                id: student.studentID,
                firstName: student.studentFirstName,
                lastName: student.studentLastName,
                role: roles.STUDENT,
            };

            req.session.user = user;

            res.redirect('/home.html');
        }
        else if (role === roles.ADVISOR) {
            const advisor = await Advisor.findOne({ advisorEmail: email });

            if (!advisor) {
                console.log("No user with matching email");
                return res.status(404).json({ error: 'No User with Matching Credentials' });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                advisor.advisorPassword
            );

            if (!isPasswordValid) {
                console.log("No user with matching password");
                return res.status(401).json({ error: 'No User with Matching Credentials' });
            }

            // Assuming successful login, set user information in the session
            user = {
                id: advisor.advisorID,
                firstName: advisor.advisorFirstName,
                lastName: advisor.advisorLastName,
                role: roles.ADVISOR,
            };

            req.session.user = user;
            res.redirect('/home.html');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//logout controller
const logoutController = async (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: 'An error occurred during logout' });
        } else {
            // Clear the session cookie
            console.log("Clearing session");
            res.clearCookie('connect.sid');

            // Redirect to the root URL
            res.redirect('/');
        }
    });
};

module.exports = { loginController, logoutController };