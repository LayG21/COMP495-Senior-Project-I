/*//imports
const mongoose = require('mongoose');
const Advisor = require('../models/Advisor');

//Prepopulate data wit schema
async function populateAdvisors() {
  try {
    const advisorsData = [
        // Insert advisor data as needed
        {
            _id: 950484712,
            advisorFirstName: "John",
            advisorLastName: "Doe",
            advisorEmail: "jd@ncat.edu",
            advisorPassword: "password",
            departmentName:"COMPUTER SCIENCE",
        },
        {
            _id: 950400712,
            advisorFirstName: "John",
            advisorLastName: "Kellt",
            advisorEmail: "jk@ncat.edu",
            advisorPassword: "password",
            departmentName:"COMPUTER SCIENCE",
        }
    ];

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
*/