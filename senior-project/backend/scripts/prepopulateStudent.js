//imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const Advisor = require('../models/Advisor');


//Prepopulate data with schema
async function populateStudents() {
  try {
    const studentsData = [
        // Insert student data as needed
        {
            studentID: 950409667,
            studentFirstName: "Jordan",
            studentLastName: "Mozebo",
            studentEmail: "jtmozebo@aggies.ncat.edu",
            studentPassword: "password",
            studentStatus: "Full-Time",
            studentClassification: "Senior",
            studentGPA: 3.3,
            advisorID: 950484712,
        },
        {
            studentID: 950405789,
            studentFirstName: "Leighana",
            studentLastName: "Glover",
            studentEmail: "llglover@aggies.ncat.edu",
            studentPassword: "password",
            studentStatus: "Full-Time",
            studentClassification: "Senior",
            studentGPA: 3.5,
            advisorID: 950400712,
      },
      {
            studentID: 950891761,
            studentFirstName: "Jonathan",
            studentLastName: "Jones",
            studentEmail: "jjones@aggies.ncat.edu",
            studentPassword: "password",
            studentStatus: "Full-Time",
            studentClassification: "Junior",
            studentGPA: 3.1,
            advisorID: 950500555,
      },
      {
            studentID: 950505789,
            studentFirstName: "Lisa",
            studentLastName: "Wade",
            studentEmail: "lwade@aggies.ncat.edu",
            studentPassword: "password",
            studentStatus: "Full-Time",
            studentClassification: "Senior",
            studentGPA: 3.4,
            advisorID: 950900111,
      },
      {
            studentID: 950705799,
            studentFirstName: "Jade",
            studentLastName: "Jackson",
            studentEmail: "jjackson@aggies.ncat.edu",
            studentPassword: "password",
            studentStatus: "Full-Time",
            studentClassification: "Senior",
            studentGPA: 3.4,
            advisorID: 950900111,
      }
    ];

    const saltRounds = 10;
    studentsData.forEach(student => {
      student.studentPassword = bcrypt.hashSync(student.studentPassword, saltRounds);
    });

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

module.exports = populateStudents;
