// Js file that will make requests based on user interaction and update html page if needed

/* For Opening and closing profile modal*/
// Get the modal
const modal = document.getElementById("profile-modal");

// Get the <span> element that closes the modal
const span = document.getElementById("close-modal");

//Get the tbody element
const tableBody = document.querySelector("tbody");

//Event Listeners

//DOMEvent to update html page as the user goes to the page
document.addEventListener('DOMContentLoaded', (event) => {
    const userRole = 'ADVISOR'; // Replace with the actual user role

    //Only shows navigation links for this page that match ones advisors can access
    updateNavigation(userRole);
    //get initial  students on load
    getStudents();

});

// When the user clicks on the button, open the modal
// check if there is a button in the td and then add click event to the button
tableBody.addEventListener("click", function (event) {
    // Check if the clicked element has the "open-modal" class (i.e., it's the "View" button)
    if (event.target.classList.contains("open-modal")) {
        // Open the modal and fetch user information
        modal.style.display = "block";
        var userID = event.target.closest("tr").querySelector("[data-label='ID']").textContent;
        getSpecificStudent(userID);
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

//UI functions for updating display

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

//initial display of table with student info
function tableDisplay(data) {
    const tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    if (data.length === 0) {
        const noResultsRow = document.createElement("tr");
        const noResultsCell = document.createElement("td");
        noResultsCell.setAttribute("colspan", "5"); // Assuming you have 5 columns
        noResultsCell.textContent = "No results found.";
        noResultsRow.appendChild(noResultsCell);
        tbody.appendChild(noResultsRow);
    } else {
        data.forEach(element => {
            const row = document.createElement("tr");
            const td_id = document.createElement("td");
            const td_fname = document.createElement("td");
            const td_lname = document.createElement("td");
            const td_email = document.createElement("td");
            const td_action = document.createElement("td");

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
    }
}


//function for updating and dislaying profile modal
function showProfile(data) {
    //console.log('Received data:', data); // Log the received data
    document.getElementById("studentID").textContent = data.studentID;
    document.getElementById("firstName").textContent = data.studentFirstName;
    //console.log('Updated firstName:', document.getElementById("firstName").textContent);
    document.getElementById("lastName").textContent = data.studentLastName;
    document.getElementById("email").textContent = data.studentEmail;
    document.getElementById("status").textContent = data.studentStatus;
    document.getElementById("major").textContent = data.studentMajor;
    document.getElementById("classification").textContent = data.studentClassification;
    document.getElementById("credits").textContent = data.studentCredit;
    document.getElementById("gpa").textContent = data.studentGPA;
}

//Functions for getitng data

//get all students assigned to advisor
function getStudents() {
    let tbody = document.querySelector("tbody");
    tbody.textContent = "";
    ; fetch('/advisor/students', {
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
            tableDisplay(data);

        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
};

//get all students that match input or are similar to it
function searchStudent() {
    let searchInput = document.getElementById("advisee-input").value;
    // if empty display default list of users
    if (searchInput.trim() === "") {
        getStudents();
        console.log("input is now empty, displaying default");
    }
    //get other users to update the table with and pass it to the  table display function
    else {
        fetch(`/advisor/students/search?searchQuery=${searchInput}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(`${errorData.error}`);
                    })
                }
                if (response.status === 204) {
                    return [];
                }
                return response.json();
            })
            .then(data => {
                tableDisplay(data);
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });

    }
    console.log(searchInput);
}

//get a specific students full profile based on their ID
function getSpecificStudent(userID) {
    fetch(`/advisor/students/${userID}`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`${errorData.error}`);
                });
            }
            //console.log(response);
            return response.json();
        })
        .then(data => {
            showProfile(data)

        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
}


//TO do implement search function and updating table to show what was sent
//Update CSS
