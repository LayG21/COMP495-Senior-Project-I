// Js file that will make requests based on user interaction and update html page if needed

//DOMEvent to update html page as the user goes to the page
document.addEventListener('DOMContentLoaded', (event) => {
    const userRole = 'ADVISOR'; // Replace with the actual user role

    updateNavigation(userRole);

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


//Server side Requests
//get all students assigned to advisor
function getStudents() {

}

//get a specific student
function getSpecificStudent() {

}

