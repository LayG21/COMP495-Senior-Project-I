//imports
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");
// Get Page
//Get Student Profile Information including the name and email of their advisor but exclude their password.
const getProfile = async (req, res) => {
    const studentID = req.params.id;

    try {
        //const studentInfo = await Student.findById(studentID).populate('advisor', 'advisorFirstName advisorLastName advisorEmail');
        const studentInfo = await Student.findById(studentID).populate({
            path: 'advisor',
            select: 'advisorFirstName advisorLastName'
        }).select('-studentPassword');

        if (!studentInfo) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(studentInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getProfile };

/*
Example Response:
{
    "_id": 950405789,
    "studentFirstName": "Leighana",
    "studentLastName": "Glover",
    "studentEmail": "llglover@aggies.ncat.edu",
    "studentPassword": "password",
    "studentStatus": "Full-Time",
    "studentClassification": "Senior",
    "studentGPA": 3.5,
    "advisor": {
        "_id": 950400712,
        "advisorFirstName": "John",
        "advisorLastName": "Kellt",
        "advisorEmail": "jk@ncat.edu"
    },
    "__v": 0
}
 */

/*
Updated Example Response:
{
    "_id": 950405789,
    "studentFirstName": "Leighana",
    "studentLastName": "Glover",
    "studentEmail": "llglover@aggies.ncat.edu",
    "studentStatus": "Full-Time",
    "studentClassification": "Senior",
    "studentGPA": 3.5,
    "advisor": {
        "_id": 950400712,
        "advisorFirstName": "John",
        "advisorLastName": "Kellt"
    },
    "__v": 0
}
*/