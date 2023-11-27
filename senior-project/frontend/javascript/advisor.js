// Js file that will make requests based on user interaction and update html page if needed

//DOMEvent to update html page as the user goes to the page
document.addEventListener('DOMContentLoaded', (event) => {
    const userRole = 'ADVISOR'; // Replace with the actual user role

    //Only shows navigation links for this page that match ones advisors can access
    updateNavigation(userRole);
    //get initial  students on load
    getStudents();

});

//Update UI
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

/* Opening and closing profile modal*/
// Get the modal
var modal = document.getElementById("profile-modal");



// Get the <span> element that closes the modal
var span = document.getElementById("close-modal");

//Get the tbody element
const tableBody = document.querySelector("tbody");

// When the user clicks on the button, open the modal
// check if there is a button in the td and then add click event to the button
tableBody.addEventListener("click", function (event) {
    // Check if the clicked element has the "open-modal" class (i.e., it's the "View" button)
    if (event.target.classList.contains("open-modal")) {
        // Open the modal and fetch user information
        modal.style.display = "block";
        var userID = event.target.closest("tr").querySelector("[data-label='ID']").textContent;
        console.log(userID);
        //fetchUserInformation(userID);
    }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//Server side Requests
//get all students assigned to advisor
function getStudents() {
    fetch('/advisor/students', {
        method: 'GET',
        credentials: 'include',
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
            initialDisplay(data);

        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
};

//initial display of table with student info
function initialDisplay(data) {
    //get body for table
    const tbody = document.getElementsByTagName("tbody")[0];
    data.forEach(element => {
        const row = document.createElement("tr");
        const td_id = document.createElement("td");
        const td_fname = document.createElement("td");
        const td_lname = document.createElement("td");
        const td_email = document.createElement("td");
        const td_action = document.createElement("td");

        //Create button
        const viewButton = document.createElement("button");
        viewButton.classList.add("open-modal");
        viewButton.textContent = "View";

        td_id.setAttribute("data-label", "ID");
        td_fname.setAttribute("data-label", "First Name");
        td_lname.setAttribute("data-label", "Last Name");
        td_email.setAttribute("data-label", "Email");
        td_action.setAttribute("data-label", "Action");

        td_id.textContent = element.studentID;
        td_fname.textContent = element.studentFirstName;
        td_lname.textContent = element.studentLastName;
        td_email.textContent = element.studentEmail;
        td_action.appendChild(viewButton);

        row.appendChild(td_id);
        row.appendChild(td_fname);
        row.appendChild(td_lname);
        row.appendChild(td_email);
        row.appendChild(td_action);

        tbody.appendChild(row);
    });
    //console.log(data);
}
//get all students that match input or are similar to it
function searchStudent() {

}


//get a specific students full profile based on their ID
function getSpecificStudent() {

}

