//imports
const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Advisor = require("../models/Advisor");

//inputs in here is the req.session.user.id which is a number, studentID which is a number and params, and searchQuery which is a query and string

//get list of assigned students
const getStudents = async (req, res) => {
  const advisorID = parseInt(req.session.user.id);

  try {
    const assignedStudents = await Student.find({ advisorID }, { _id: 0, studentID: 1, studentFirstName: 1, studentLastName: 1, studentEmail: 1 });

    if (assignedStudents.length === 0) {
      return res.status(404).json({ message: "No Students Found" });
    }

    res.status(200).json(assignedStudents);
  } catch (error) {
    console.log("Error with getting assigned students", error);
    res.status(500).json({ message: error.message });
  }
};




//get specific assigned student
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
      // shape the output
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

//search controller for displaying students that match what is typed in input
const searchStudents = async (req, res) => {
  const advisorID = parseInt(req.session.user.id);
  const searchQuery = req.query.searchQuery;

  try {
    const searchResults = await Student.find(
      {
        advisorID: advisorID,
        $or: [
          { studentFirstName: { $regex: new RegExp(searchQuery, 'i') } },
          { studentLastName: { $regex: new RegExp(searchQuery, 'i') } },
          { studentEmail: { $regex: new RegExp(searchQuery, 'i') } },
        ],
      },
      // Select specific fields to return
      { studentID: 1, studentFirstName: 1, studentLastName: 1, studentEmail: 1, _id: 0 }
    );

    if (searchResults.length === 0) {
      return res.status(204).json();
    }
    // Format the response to match the structure of getStudents
    const formattedResponse = searchResults.map(student => ({
      studentID: student.studentID,
      studentFirstName: student.studentFirstName,
      studentLastName: student.studentLastName,
      studentEmail: student.studentEmail,
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.log('Error with searching students', error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getStudents, getSpecificStudent, searchStudents };