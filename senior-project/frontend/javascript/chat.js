// Variables for storing information
//const socket = io();
let allUsers = null;
let selectedUserID = null;
let selectedUserName = null;
let isChatWindowOpened = false;

//Need to add event listener to the list of users to select a user
//Need to add event listener to the chat window to send a message

//Note: happens faster with the selection on the side
// Event listener for when the user is selected
function handleUserSelection() {
    const sidebarContainer = document.querySelector(".sidebar-userlist");


    sidebarContainer.addEventListener("click", function (event) {
        // Check if the clicked element or its ancestor has the "sidebar-user" class
        const clickedUser = event.target.closest('.sidebar-user');

        if (clickedUser) {
            selectedUserID = clickedUser.getAttribute('data-userID');
            selectedUserName = clickedUser.querySelector('.sidebar-username').textContent;

            // Test printing out user when they are selected
            console.log(selectedUserID);
            console.log(selectedUserName);
        }
    });
}

//Updates links displayed in navigation bar based on logged in users role that is stored in the session
document.addEventListener('DOMContentLoaded', () => {
    //call to the function that adds clicklisteners to all the users in the sidebar
    handleUserSelection();

    //Dispaly all users you can chat with
    getUsers();
});

//get users for sidebar display
function getUsers() {
    //fetch users
    fetch('/chat/users', {
        method: "GET",
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`Message: ${errorData.error}`);
                });
            }
            return response.json();
        })
        .then(users => {
            //console.log(users.data);
            updateUserList(users.data);
        })
        .catch(error => {
            alert('Error:' + error.message);
        });
}

//function for updating sidebar with users
function updateUserList(users) {
    let sidebarContainer;
    if (!sidebarContainer) {
        sidebarContainer = document.querySelector(".sidebar-userlist");
    }
    //console.log(sidebarContainer.textContent);
    //console.log(users);

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.classList.add('sidebar-user');
        listItem.setAttribute('data-userID', user.id);

        const username = document.createElement('p');
        username.classList.add('sidebar-username');
        username.textContent = `${user.firstName} ${user.lastName}`;

        listItem.appendChild(username);
        //console.log(listItem);
        sidebarContainer.appendChild(listItem);
    });
}

//function for when something is typed in input field of search box

function searchUsers() {
    let searchInput = document.getElementById("search-input").value;
    console.log(`something typed in search field:${searchInput}`)
}

//function for displaying users on search
function displaySearchResults(users) {

}

//Function for UI updates
//Makes UI update by adding message to window as a receiver

function makeReceiverMessage() {

}
//function for UI updates
//Makes UI update by adding message to window as sender
function makeSendermessage() {

}
// chat.js

// Your Socket.IO logic goes here


/*socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});*/

//function to send message. Will need to grab the selectedUserID that was stored when the currentuser selected someone to chat with
//trigger socket event for sending message
function sendMessage() {



}


//function to window and set current user as being no one because there is no open conversation/window
//function closeConversation() { }

//function where you select a user and it stores that selected user to be used for api requests
//Should also work to change chat window or open chat window depending on if you selected a different user or the chat window was never open
//function selectUser() { }


