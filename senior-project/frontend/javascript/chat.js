//Request to server to logout after clicking the logout link in the navigation bar

function logout() {
    // Make a POST request to the logout endpoint
    fetch('/logout', { method: 'POST' })
        .then((response) => {
            //if successful they are logged out
        })
        .catch((error) => {
            // Handle error if logout request fails
        });
}
// variables to hold selectedusersID,name, and to determine if the chat window is open
let selectedUserID = null;
let selectedUserName = null;
let isChatWindowOpened = false;

//get users on page load and display in sidebar. Each user should have their id stored in a data attribute that is part of the li element
//and a name of the user inside the span element

document.addEventListener('DOMContentLoaded', () => {
    // Function to update navigation based on user role
    const updateNavigation = (userRole) => {
        const navItems = document.querySelectorAll('.links li');

        navItems.forEach((item) => {
            const role = item.getAttribute('data-role');
            if (role && role !== userRole) {
                item.remove(); // Remove the navigation item from the DOM if the role doesn't match
            }
        });
    };

    // Example usage: Assuming you have retrieved the user role from the server-side or session data
    const userRole = 'advisor'; // Replace with the actual user role

    updateNavigation(userRole);
});



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
