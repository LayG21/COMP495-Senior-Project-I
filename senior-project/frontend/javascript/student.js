//DOMEvent to update html page as the user goes to the page
document.addEventListener('DOMContentLoaded', (event) => {
    const userRole = 'STUDENT'; // Replace with the actual user role

    //Change navbar to display links user has access to
    updateNavigation(userRole);
    //update front end to dispay data
    getProfile();
});

/****************************************
 *        Request Functions        *
 ****************************************/

//Gets students information
function getProfile() {
    const errorContainer = document.getElementById('error-container');

    // Fetch student profile data
    fetch('/student/profile', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`${errorData.error}`);
                });
            }
            return response.json();
        })
        .then(data => {
            displayProfile(data);
        })
        .catch(error => {
            console.error(error);
            showErrorMessage(error);

        });
}

/****************************************
 *        UI Functions        *
 ****************************************/


// UI Function to update navigation based on user role
function updateNavigation(userRole) {
    const navItems = document.querySelectorAll('.links li');

    navItems.forEach((item) => {
        const role = item.getAttribute('data-role');
        if (role && role !== userRole) {
            item.remove(); // Remove the navigation item from the DOM if the role doesn't match
        }
    });
}

//UI function for updating page with data
function displayProfile(data) {
    document.getElementById('name-input').textContent = `${data.studentFirstName} ${data.studentLastName}`;
    document.getElementById('id-input').textContent = data.studentID;
    document.getElementById('email-input').textContent = data.studentEmail;
    document.getElementById('status-input').textContent = data.studentStatus;
    document.getElementById('classification-input').textContent = data.studentClassification;
    document.getElementById('credit-input').textContent = data.studentCredit;
    document.getElementById('gpa-input').textContent = data.studentGPA;
    document.getElementById('major-input').textContent = data.studentMajor;
    document.getElementById('advisor-input').textContent = `${data.advisorFirstName} ${data.advisorLastName}`;
    document.getElementById('advisor-email-input').textContent = data.advisorEmail;
}

//UI Function to display Errors
function showErrorMessage(message) {
    let errorContainer = document.getElementById("error-container");
    let listErrors = document.getElementById("listed-messages");
    //errorContainer.textContent = '';
    listErrors.textContent = '';
    if (message && message.error) {
        // Handle single error
        errorContainer.style.display = "block";
        let errorDiv = document.createElement('li');
        errorDiv.textContent = message.error;
        listErrors.appendChild(errorDiv);
        errorContainer.appendChild(listErrors);
    }
}




//UI function to close error box
function closeErrorContainer() {
    console.log("Closing error container");
    document.getElementById("error-container").style.display = "none";
}