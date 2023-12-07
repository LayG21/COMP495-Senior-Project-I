// Variables for storing information
const socket = io();
//let allUsers = null;
let selectedUserID = "";
let selectedUserName = "";

//console.log(chatBody);


//Need to add event listener to the list of users to select a user
//Need to add event listener to the chat window to send a message

//event listener for when user goes to page

document.addEventListener('DOMContentLoaded', () => {
    //console.log("domcontentloaded");
    //Dispaly all users you can chat with
    getUsers();
});

let sidebarUserlist = document.getElementById("user-list");
let sidebar = document.getElementById("sidebar");
let chatWindow = document.getElementById("chat-window");
let chatHeaderName = document.getElementById("selected-username");
let chatBody = document.getElementById("chat-body");

//event listener for selecting user in sidebar
sidebarUserlist.addEventListener("click", function (event) {
    let clickedUser = event.target.closest(".sidebar-user");
    if (clickedUser) {
        selectedUserID = parseInt(clickedUser.getAttribute("data-userID"));
        selectedUserName = clickedUser.querySelector(".sidebar-username").textContent;

        printSelected();
        getMessages(selectedUserID, selectedUserName);
    }
});

//Test for seeing if the user is selected and can be accessed in different function
function printSelected() {
    console.log(`This is a test: the selected usersID: ${selectedUserID} and this is their username ${selectedUserName}`);
}

//console.log(sidebar);
//Note: happens faster with the selection on the side
// Event listener for when the user is selected


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

function getMessages(selectedUserID, selectedUserName) {
    fetch(`/chat/messages/${parseInt(selectedUserID)}`, {
        method: "GET",
        credentials: "include",
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`${errorData.error}`);
                })
            };
            if (response.status === 204) {
                console.log(" No messages foung between selected User and current user");
                return [];
            };
            return response.json();
        })
        .then(data => {
            openConversation(data);
            //console.log("Received Messages");
            //console.log(data);
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
}

//Function for updating UI with messages if there Are Any
function openConversation(data) {
    chatBody.textContent = "";
    chatHeaderName.textContent = "";
    chatHeaderName.textContent = selectedUserName;

    // Open the window (or update header if already open)
    chatWindow.style.visibility = 'visible';

    if (data.length === 0) {
        displayNoMessages();
    } else {
        data.forEach(message => {
            let nomsgDiv = document.getElementById("noMessage");
            if (nomsgDiv) {
                chatBody.removeChild(nomsgDiv);
            }
            let messageDiv = document.createElement("div");
            messageDiv.classList.add("messages");

            let messageContent = document.createElement("div");
            messageContent.classList.add(message.senderID === selectedUserID ? "receiverMessage" : "senderMessage");

            let messageText = document.createElement("p");
            messageText.textContent = message.content;

            messageContent.appendChild(messageText);
            messageDiv.appendChild(messageContent);
            chatBody.appendChild(messageDiv);
        });
    }
}

//Update UI to tell user there are no messages
function displayNoMessages() {
    // Check if the "noMessage" div already exists
    let nomsgDiv = document.getElementById("noMessage");
    if (!nomsgDiv) {
        let nomessageConteiner = document.createElement("div");
        let nomessage = document.createElement("p");

        nomessageConteiner.setAttribute("id", "noMessage");
        nomessage.textContent = "No messages found";

        nomessageConteiner.appendChild(nomessage);
        chatBody.appendChild(nomessageConteiner);
    }
}


//function for updating sidebar with users
function updateUserList(users) {
    let sidebarContainer = document.querySelector("#sidebar-userlist");

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


//clear window/ chat and close it
function closeChat() {
    //clear header
    selectedUserID = "";
    selectedUserName = "";
    chatHeaderName.textContent = "";
    chatBody.textContent = "";
    chatWindow.style.visibility = "hidden";
}

//Function for UI updates
//Makes UI update by adding message to window as a receiver

function makeReceiverMessage(content) {
    //remove no msg div if there is one
    let nomsgDiv = document.getElementById("noMessage");
    if (nomsgDiv) {
        chatBody.removeChild(nomsgDiv);
    }

    let messageDiv = document.createElement("div");
    messageDiv.classList.add("messages");

    let messageContent = document.createElement("div");
    messageContent.classList.add("receiverMessage");

    let messageText = document.createElement("p");
    messageText.textContent = content;

    messageContent.appendChild(messageText);
    messageDiv.appendChild(messageContent);
    chatBody.appendChild(messageDiv);
}
//function for UI updates
//Makes UI update by adding message to window as sender
function makeSenderMessage(content) {
    //remove no msg div if there is one
    let nomsgDiv = document.getElementById("noMessage");

    if (nomsgDiv) {
        chatBody.removeChild(nomsgDiv);
    }
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("messages");

    let messageContent = document.createElement("div");
    messageContent.classList.add("senderMessage");

    let messageText = document.createElement("p");
    messageText.textContent = content;

    messageContent.appendChild(messageText);
    messageDiv.appendChild(messageContent);
    chatBody.appendChild(messageDiv);
}
// chat.js

// Your Socket.IO logic goes here


socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('receiveMessage', function ({ senderID, content }) {
    //if the person you are currently chatting with is the matching senderID, display the message
    if (senderID === selectedUserID) {
        makeReceiverMessage(content);
    }
});

socket.on('errorMessage', (data) => {
    // Handle the error message
    console.error('Error:', data.error);

    // Display the error message to the user (you can customize this part)
    alert(`Error: ${data.error}`);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

//function to send message. Will need to grab the selectedUserID that was stored when the currentuser selected someone to chat with
//trigger socket event for sending message
function sendMessage() {
    let receiverID = parseInt(selectedUserID);
    let content = document.getElementById("chat-input").value;
    if (content !== "" && receiverID !== null) {
        socket.emit('sendMessage', { receiverID, content });

        //call to display message that was sent
        makeSenderMessage(content);
    }
    else {
        alert("Please type in input before sending and select a user");
    }
}