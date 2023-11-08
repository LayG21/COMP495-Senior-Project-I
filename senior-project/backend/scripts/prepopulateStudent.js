/*//imports
const mongoose = require('mongoose');
const Student = require('../models/Student');
const Advisor = require('../models/Advisor');

//Prepopulate data wit schema
async function populateStudents() {
  try {
    //const advisors = await Advisor.find();
    const studentsData = [
        // Insert student data as needed
        {
            _id: 950409667,
            studentFirstName: "Jordan",
            studentLastName: "Mozebo",
            studentEmail: "jtmozebo@aggies.ncat.edu",
            studentPassword: "password",
            studentStatus: "Full-Time",
            studentClassification: "Senior",
            studentGPA: 3.3,
            advisor: 950484712,
        },
        {
            _id: 950405789,
            studentFirstName: "Leighana",
            studentLastName: "Glover",
            studentEmail: "llglover@aggies.ncat.edu",
            studentPassword: "password",
            studentStatus: "Full-Time",
            studentClassification: "Senior",
            studentGPA: 3.5,
            advisor: 950400712,
        },
    ];

    await Student.insertMany(studentsData);
    console.log('Students data inserted successfully');
  } catch (error) {
    console.error('Error inserting students data:', error);
  }
}

// Run the populateStudents function when this script is executed directly
if (require.main === module) {
  populateStudents();
}

module.exports = populateStudents;*/