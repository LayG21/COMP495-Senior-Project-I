//imports
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");

// Get Student Profile Information including the name and email of their advisor but exclude their password.
const getProfile = async (req, res) => {
  const studentID = parseInt(req.session.user.id);

  try {
    
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
          studentMajor: 1,
          studentCredit: 1,
          advisorFirstName: '$advisorInfo.advisorFirstName',
          advisorLastName: '$advisorInfo.advisorLastName',
          advisorEmail: '$advisorInfo.advisorEmail',
        }

      }
    ]);


    if (!studentInfo || studentInfo.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

   

    res.status(200).json(studentInfo[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }

};



module.exports = { getProfile };
