//imports
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");

//get page

//get list of students
const getStudents = async (req, res) => {
  const advisorID = parseInt(req.params.id);

  try {
    const assignedStudents = await Student.aggregate([
      {
        $match: {
          advisorID: advisorID,
        },
      },
      // $lookup stage to join students with advisors
      {
        $lookup: {
          from: 'advisors',
          localField: 'advisorID',
          foreignField: 'advisorID',
          as: 'advisorInfo',
        },
      },
      // $unwind stage to destructure the advisorInfo array
      {
        $unwind: '$advisorInfo',
      },
      // $project stage to shape the output
      {
        $project: {
          _id: 0,
          studentID: 1,
          studentFirstName: 1,
          studentLastName: 1,
          studentEmail: 1,
          studentStatus: 1,
          studentClassification: 1,
          studentGPA: 1,
          advisorFirstName: '$advisorInfo.advisorFirstName',
          advisorLastName: '$advisorInfo.advisorLastName',
          advisorEmail: '$advisorInfo.advisorEmail',
        },
      },
    ]);

    if (assignedStudents.length === 0) {
      return res.status(404).json({ message: "No Students Found" });
    }

    res.status(200).json(assignedStudents);
  } catch (error) {
    console.log("Error with getting assigned students", error);
    res.status(500).json({ message: error.message });
  }
};






//get specific student
const getSpecificStudent = async (req, res) => {
  const advisorID = parseInt(req.params.id);
  const studentID = parseInt(req.params.studentID);

  try {
    const specificStudent = await Student.aggregate([
      {
        $match: {
          advisorID: advisorID,
          studentID: studentID,
        },
      },
      // $lookup stage to join students with advisors
      {
        $lookup: {
          from: 'advisors',
          localField: 'advisorID',
          foreignField: 'advisorID',
          as: 'advisorInfo',
        },
      },
      // $unwind stage to destructure the advisorInfo array
      {
        $unwind: '$advisorInfo',
      },
      // $project stage to shape the output
      {
        $project: {
          _id: 0,
          studentID: 1,
          studentFirstName: 1,
          studentLastName: 1,
          studentEmail: 1,
          studentStatus: 1,
          studentClassification: 1,
          studentGPA: 1,
          advisorFirstName: '$advisorInfo.advisorFirstName',
          advisorLastName: '$advisorInfo.advisorLastName',
          advisorEmail: '$advisorInfo.advisorEmail',
        },
      },
    ]);

    if (specificStudent.length === 0) {
      return res.status(404).json({ message: 'No Matching Student' });
    }

    res.status(200).json(specificStudent);
  } catch (error) {
    console.log('Error with getting specific student', error);
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