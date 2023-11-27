//imports
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");

//get page

//get list of assigned students
const getStudents = async (req, res) => {
  const advisorID = parseInt(req.session.user.id);

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



//get specific assigned  student
const getSpecificStudent = async (req, res) => {
  const advisorID = parseInt(req.session.user.id);
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
          studentCredit: 1,
          studentMajor: 1,
          advisorFirstName: '$advisorInfo.advisorFirstName',
          advisorLastName: '$advisorInfo.advisorLastName',
          advisorEmail: '$advisorInfo.advisorEmail',
        },
      },
    ]);

    if (specificStudent.length === 0) {
      return res.status(404).json({ message: 'No Matching Student' });
    }

    res.status(200).json(specificStudent[0]);
  } catch (error) {
    console.log('Error with getting specific student', error);
    res.status(500).json({ message: error.message });
  }
};

//TO DO ass a searh controller for displaying students that match what is typed in input
const searchStudents = async (req, res) => {
  const advisorID = parseInt(req.session.user.id);
  const searchQuery = req.query;
  try {

  } catch (error) {

  }
};

/*
Example Response getstudents:
[
    {
        "studentID": 950505789,
        "studentFirstName": "Lisa",
        "studentLastName": "Wade",
        "studentEmail": "lwade@aggies.ncat.edu"
    },
    {
        "studentID": 950705799,
        "studentFirstName": "Jade",
        "studentLastName": "Jackson",
        "studentEmail": "jjackson@aggies.ncat.edu"
    }
]
 */

/*
Example Response get specific student:
[
    {
        "studentID": 950705799,
        "studentFirstName": "Jade",
        "studentLastName": "Jackson",
        "studentEmail": "jjackson@aggies.ncat.edu",
        "studentStatus": "Full-Time",
        "studentClassification": "Senior",
        "studentGPA": 3.4,
        "studentCredit": 100,
        "studentMajor": "Computer Science",
        "advisorFirstName": "Mariah",
        "advisorLastName": "Green",
        "advisorEmail": "mg@ncat.edu"
    }
]
 */



module.exports = { getStudents, getSpecificStudent, searchStudents };