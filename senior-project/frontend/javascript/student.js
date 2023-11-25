// Js file that will make requests based on user interaction and update html page if needed

//DOMEvent to update html page as theuser goes to the page
document.addEventListener('DOMContentLoaded', (event) => {
    const userRole = 'STUDENT'; // Replace with the actual user role

    updateNavigation(userRole);
});
//server side requests
//Gets students information
/*function getProfile() {
    const errorContainer = document.getElementById('error-container');

    // Fetch student profile data
    fetch('/student/profile', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update HTML elements with fetched data
            document.getElementById('name-input').textContent = `${data.studentFirstName} ${data.studentLastName}`;
            document.getElementById('email-input').textContent = data.studentEmail;
            document.getElementById('classification-input').textContent = data.studentClassification;
            document.getElementById('credit-input').textContent = data.studentCredit;
            document.getElementById('gpa-input').textContent = data.studentGPA;
            document.getElementById('major-input').textContent = data.studentMajor;
            document.getElementById('advisor-input').textContent = `${data.advisorFirstName} ${data.advisorLastName}`;
            document.getElementById('advisor-email-input').textContent = data.advisorEmail;
            // Update other elements similarly
        })
        .catch(error => {
            console.error('Error:', error);

            // Display the error to the user
            errorContainer.textContent = `An error occurred: ${error.message}`;
        });
});
}*/

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

function displayProfile() {

}
//Change links displayed
//Upload student information onto the page
