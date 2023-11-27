// Js file that will make requests based on user interaction and update html page if needed

//DOMEvent to update html page as the user goes to the page
document.addEventListener('DOMContentLoaded', (event) => {
    const userRole = 'STUDENT'; // Replace with the actual user role

    //Change navbar to display links user has access to
    updateNavigation(userRole);
});

//server side requests
//gets and displays student information or will display error
//Gets students information
function getProfile() {

}

//Upadating of UI with the data

// Function to update navigation based on user role
function updateNavigation(userRole) {
    const navItems = document.querySelectorAll('.links li');

    navItems.forEach((item) => {
        const role = item.getAttribute('data-role');
        if (role && role !== userRole) {
            item.remove(); // Remove the navigation item from the DOM if the role doesn't match
        }
    });
}

function displayProfile(data) {
          // Create HTML elements
          const studentIdElement = document.getElementById('studentId');
          const nameElement = document.getElementById('name-input');
          const studentemailElement = document.getElementById('student-email');
          const statusElement = document.getElementById('student-status');
          const classificationElement = document.getElementById('classification-input');
          const gpaElement = document.getElementById('gpa-input');
          const advisorElement = document.getElementById('advisor-input');
          const emailElement = document.getElementById('email-input');
   
          // Update the HTML elements with the profile data
          studentIdElement.innerHTML = data.studentID;
          nameElement.innerHTML = data.studentFirstName +" "+ data.studentLastName;
          studentemailElement.innerHTML =  data.studentEmail;
          statusElement.innerHTML =  data.studentStatus;
          classificationElement.innerHTML = data.studentClassification;
          gpaElement.innerHTML = data.studentGPA;
          advisorElement.innerHTML = data.advisorFirstName +" "+ data.advisorLastName;
          emailElement.innerHTML = data.advisorEmail;
}


//Change links displayed
//Upload student information onto the page
window.onload = function(){
    //displayProfile(data);
    getProfile();
}

