// Js file that will make requests based on user interaction and update html page if needed

//DOMEvent to update html page as theuser goes to the page
document.addEventListener('DOMContentLoaded', (event) => {
    const userRole = 'STUDENT'; // Replace with the actual user role

    updateNavigation(userRole);
});
//server side requests
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

function displayProfile() {

}
//Change links displayed
//Upload student information onto the page
