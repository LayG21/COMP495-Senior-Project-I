//Main script that runs prepopulation of data

const populateStudents = require('./prepopulateStudent');
const populateAdvisors = require('./prepopulateAdvisor');
const populateClasses = require('./prepopulateClass');

async function prepopulateData() {
  try {
    await populateAdvisors();
    await populateStudents();
    await populateClasses();

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
