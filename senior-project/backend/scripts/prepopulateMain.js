/*//Main script that runs prepopulation of data

const populateStudents = require('./prepopulateStudent');
const populateAdvisors = require('./prepopulateAdvisor');

async function prepopulateData() {
  try {
    // You can control the order of execution or run in parallel as needed
    await populateAdvisors();
    await populateStudents();

    console.log('Data prepopulation completed successfully');
  } catch (error) {
    console.error('Error during data prepopulation:', error);
  }
}

// Run the prepopulateData function when this script is executed directly
if (require.main === module) {
  prepopulateData();
}

module.exports = prepopulateData;
*/