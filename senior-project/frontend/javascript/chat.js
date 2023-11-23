// Variables for storing information
//const socket = io();
let allUsers = null;
let selectedUserID = null;
let selectedUserName = null;
let isChatWindowOpened = false;

//Need on load event for displaying the list of users as the user goes to the page
//Need to add event listener to the list of users to select a user
//Need to add event listener to the chat window to send a message

// Event listener for when the user is selected
function handleUserSelection() {
    allUsers = document.querySelectorAll('.sidebar-user');
    allUsers.forEach((user) => {
        user.addEventListener('click', () => {
            selectedUserID = user.getAttribute('data-userID');
            selectedUserName = user.querySelector('.sidebar-username').textContent;

            // Test printing out user when they are selected
            console.log(selectedUserID);
            console.log(selectedUserName);
        });
    });
}

// chat.js

// Your Socket.IO logic goes here


/*socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});*/

// Other Socket.IO logic specific to your chat page
// ...






//Updates links displayed in navigation bar based on logged in users role that is stored in the session
document.addEventListener('DOMContentLoaded', () => {

    // Example usage: Assuming you have retrieved the user role from the server-side or session data
    //const userRole = 'ADVISOR'; // Replace with the actual user role

    //updateNavigation(userRole);

    //call to the function that adds clicklisteners to all the users in the sidebar
    handleUserSelection();
});

// Function to update navigation based on user role
/*function updateNavigation(userRole) {
    const navItems = document.querySelectorAll('.links li');

    navItems.forEach((item) => {
        const role = item.getAttribute('data-role');
        if (role && role !== userRole) {
            item.remove(); // Remove the navigation item from the DOM if the role doesn't match
        }
    });
}*/


/*document.addEventListener('DOMContentLoaded', () => {
    // Function to update navigation based on user role
    const updateNavigation = (userRole) => {
        const navItems = document.querySelectorAll('.links li');

        navItems.forEach((item) => {
            const role = item.getAttribute('data-role');
            if (role && role !== userRole) {
                item.style.display = 'none'; // Hide the navigation item if the role doesn't match
            } else {
                item.style.display = ''; // Show the navigation item if the role matches or there's no data-role attribute
            }
        });
    };

    // Example usage: Assuming you have retrieved the user role from the server-side or session data
    const userRole = 'student'; // Replace with the actual user role

    updateNavigation(userRole);
});*/

//function to update the user when a user is selected from the div
//selectedUsersId is stored in a data attribute and name is stored in the span that shows user name


//function to window and set current user as being no one because there is no open conversation/window
//function closeConversation() { }

//function where you select a user and it stores that selected user to be used for api requests
//Should also work to change chat window or open chat window depending on if you selected a different user or the chat window was never open
//function selectUser() { }

//function to send message. Will need to grab the selectedUserID that was stored when the currentuser selected someone to chat with
