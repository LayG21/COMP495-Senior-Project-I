//imports
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

//get page

//get list of students
const getStudents = async (req, res) => {
    const advisorID = req.params.id;

    try {
        //get students with matching advisor id
        const assignedStudents = await Student.find({ advisor: advisorID });
        if (assignedStudents.length === 0) {
            return res.status(404).json({ message: "No Students Found" });
        }
        res.status(200).json(assignedStudents);
    } catch (error) {
        console.log("Error with getting assigned students");
        res.status(500).json({ message: error.message });
    }
};

//get specific student
const getSpecificStudent = async (req, res) => {
    const advisorID = req.params.id;
    const studentID = req.params.studentID;

    //console.log("Advisor ID:", advisorID);
    //console.log("Student ID:", studentID);


    try {
        //get specific studentd with matching ids
       const specificStudent = await Student
            .findOne({ _id: studentID, advisor: advisorID })
            .populate('advisor', 'advisorFirstName advisorLastName advisorEmail')
            .select('-studentPassword');
        
        if (!specificStudent) {
            return res.status(404).json({ message: 'No Matching Student' });
        }
        res.status(200).json(specificStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/*
Example Response getstudents:
[
    {
        "_id": 950409667,
        "studentFirstName": "Jordan",
        "studentLastName": "Mozebo",
        "studentEmail": "jtmozebo@aggies.ncat.edu",
        "studentPassword": "password",
        "studentStatus": "Full-Time",
        "studentClassification": "Senior",
        "studentGPA": 3.3,
        "advisor": 950484712,
        "__v": 0
    },
    {
        "_id": 950777614,
        "studentFirstName": "Tina",
        "studentLastName": "Mary",
        "studentEmail": "tmmozebo@aggies.ncat.edu",
        "studentPassword": "password",
        "studentStatus": "Full-Time",
        "studentClassification": "Senior",
        "studentGPA": 3.2,
        "advisor": 950484712,
        "__v": 0
    }
]
 */

/*
Example Response get specific student:
{
    "_id": 950409667,
    "studentFirstName": "Jordan",
    "studentLastName": "Mozebo",
    "studentEmail": "jtmozebo@aggies.ncat.edu",
    "studentStatus": "Full-Time",
    "studentClassification": "Senior",
    "studentGPA": 3.3,
    "advisor": {
        "_id": 950484712,
        "advisorFirstName": "John",
        "advisorLastName": "Doe",
        "advisorEmail": "jd@ncat.edu"
    },
    "__v": 0
}
 */



module.exports = { getStudents,getSpecificStudent};