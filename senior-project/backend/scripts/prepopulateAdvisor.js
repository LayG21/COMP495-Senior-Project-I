//imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Advisor = require('../models/Advisor');

//Prepopulate data with schema
async function populateAdvisors() {
  try {
    const advisorsData = [
        // Insert advisor data as needed
        {
            advisorID: 950484712,
            advisorFirstName: "John",
            advisorLastName: "Doe",
            advisorEmail: "jd@ncat.edu",
            advisorPassword: "password",
            departmentName:"COMPUTER SCIENCE",
        },
        {
            advisorID: 950400712,
            advisorFirstName: "John",
            advisorLastName: "Kelly",
            advisorEmail: "jk@ncat.edu",
            advisorPassword: "password",
            departmentName:"COMPUTER SCIENCE",
      },
      {
            advisorID: 950500555,
            advisorFirstName: "Randy",
            advisorLastName: "Bill",
            advisorEmail: "rb@ncat.edu",
            advisorPassword: "password",
            departmentName:"COMPUTER SCIENCE"
      },
      {
            advisorID: 950900111,
            advisorFirstName: "Mariah",
            advisorLastName: "Green",
            advisorEmail: "mg@ncat.edu",
            advisorPassword: "password",
            departmentName:"COMPUTER SCIENCE"
      }
    ];
    const saltRounds = 10;
    advisorsData.forEach(advisor => {
      advisor.advisorPassword = bcrypt.hashSync(advisor.advisorPassword, saltRounds);
    });

    await Advisor.insertMany(advisorsData);
    console.log('Advisors data inserted successfully');
  } catch (error) {
    console.error('Error inserting advisors data:', error);
  }
}

// Run the populateAdvisors function when this script is executed directly
if (require.main === module) {
  populateAdvisors();
}

module.exports = populateAdvisors;
