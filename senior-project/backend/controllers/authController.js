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
                return res.status(404).send('Student not found');
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                student.studentPassword
            );

            if (!isPasswordValid) {
                return res.status(401).send('Invalid password');
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
                return res.status(404).send('Advisor not found');
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                advisor.advisorPassword
            );

            if (!isPasswordValid) {
                return res.status(401).send('Invalid password');
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
        res.status(400).send('Bad Request');
    }
};

module.exports = { loginController };