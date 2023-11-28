//imports
//Controller or business logic for logging in and logging out
const express = require('express');
const Student = require("../models/Student.js");
const Advisor = require("../models/Advisor");
const { roles } = require("../roles/roles.js");
const bcrypt = require('bcrypt');

const loginController = async (req, res) => {
    const role = req.body.userType;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    let user = null;

    try {

        if (role === roles.STUDENT) {
            // Perform authentication logic for student
            // Example: Check user credentials in the database
            const student = await Student.findOne({ studentEmail: email });
            if (!student) {
                console.log("No User with matching Email");
                return res.status(404).send('No User with Matching Credentials');
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                student.studentPassword
            );

            if (!isPasswordValid) {
                console.log("No user with matching password");
                return res.status(401).send('No User With Matching Credentials');
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
            // Perform authentication logic for advisor
            // Example: Check advisor credentials in the database
            const advisor = await Advisor.findOne({ advisorEmail: email });

            if (!advisor) {
                console.log("No user with matching email");
                return res.status(404).send('No User with Matching Credentials');
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                advisor.advisorPassword
            );

            if (!isPasswordValid) {
                console.log("No user with matching password");
                return res.status(401).send('No User with Matching Credentials');
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
        res.status(500).send('Internal Server Error');
    }
};

//logout controller
//works
const logoutController = async (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('An error occurred during logout');
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