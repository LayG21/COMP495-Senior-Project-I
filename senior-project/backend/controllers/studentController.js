//imports
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");
// Get Page

// Get Student Profile Information including the name and email of their advisor but exclude their password.
const getProfile = async (req, res) => {
  const studentID = parseInt(req.session.user.id);

  try {
    console.log('Attempting to get profile for studentID:', studentID);
    const studentInfo = await Student.aggregate([
      {
        $match: { studentID: studentID }
      },
      {
        $lookup: {
          from: 'advisors',
          localField: 'advisorID',
          foreignField: 'advisorID',
          as: 'advisorInfo'
        }
      },
      {
        $unwind: '$advisorInfo',
      },
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
          advisorEmail: '$advisorInfo.advisorEmail', // Exclude advisor _id
        }

      }
    ]);

    console.log('After aggregation, studentInfo:', studentInfo);

    if (!studentInfo || studentInfo.length === 0) {
      console.log('Student Info:', studentInfo);
      return res.status(404).json({ message: 'Student not found' });
    }

    console.log('Sending studentInfo to client:', studentInfo[0]);

    res.status(200).json(studentInfo[0]);
  } catch (error) {
    console.error('Error in getProfile:', error.message);
    res.status(500).json({ message: error.message });
  }

};



module.exports = { getProfile };

/*
Example Response:
{
    "studentID": 950705799,
    "studentFirstName": "Jade",
    "studentLastName": "Jackson",
    "studentEmail": "jjackson@aggies.ncat.edu",
    "studentStatus": "Full-Time",
    "studentClassification": "Senior",
    "studentGPA": 3.4,
    "advisorFirstName": "Mariah",
    "advisorLastName": "Green",
    "advisorEmail": "mg@ncat.edu"
}
*/