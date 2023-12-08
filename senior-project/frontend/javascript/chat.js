// Variables for storing information
const socket = io();
let selectedUserID = "";
let selectedUserName = "";

//event listener for when user goes to page

document.addEventListener('DOMContentLoaded', () => {
    //Dispaly all users you can chat with
    getUsers();
});

let sidebarUserlist = document.getElementById("user-list");
let sidebar = document.getElementById("sidebar");
let chatWindow = document.getElementById("chat-window");
let chatHeaderName = document.getElementById("selected-username");
let chatBody = document.getElementById("chat-body");
let searchResultsContainer = document.getElementById("searched-users");

//event listener for selecting user in sidebar
sidebarUserlist.addEventListener("click", function (event) {
    let clickedUser = event.target.closest(".sidebar-user");
    if (clickedUser) {
        selectedUserID = parseInt(clickedUser.getAttribute("data-userID"));
        selectedUserName = clickedUser.querySelector(".sidebar-username").textContent;

        getMessages(selectedUserID, selectedUserName);
    }
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
            //change this to be different and display to users
            let errorRes = 'Error:' + error.message;
            handleResponse(errorRes);
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
            let errorRes = 'Error: ' + error.message;
            handleResponse(errorRes);
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
    if (searchInput !== '') {
        fetch(`/chat/search?searchQuery=${encodeURIComponent(searchInput)}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.status === 204) {
                    return [];
                }
                return response.json();
            })
            .then(users => {
                displaySearchResults(users);
            })
            .catch(error => {
                let response = `Error during search:${error}`
                handleResponse(response);
                //console.error();
            });
    } else {
        clearSearchResults();
    }
}

// function for displaying users on search
function displaySearchResults(users) {
    let searchInput = document.getElementById("search-input").value.trim();

    // Check if the search input is empty
    if (searchInput === '') {
        clearSearchResults();
        return;
    }

    // Show the container
    searchResultsContainer.style.display = "block";

    // Check if there are no search results
    if (!users || users.length === 0) {
        searchResultsContainer.style.display = "block";
        searchResultsContainer.innerHTML = '';

        let noResultsMessage = document.createElement('li');
        noResultsMessage.classList.add('noSearch');
        noResultsMessage.textContent = 'No Results Found'

        searchResultsContainer.appendChild(noResultsMessage);
        return;
    }

    // Display search results
    searchResultsContainer.innerHTML = '';
    users.forEach(user => {
        let listItem = document.createElement('li');
        listItem.classList.add('search');
        listItem.setAttribute('data-userID', user.id);
        listItem.textContent = `${user.firstName} ${user.lastName}`;
        searchResultsContainer.appendChild(listItem);
    });
}
function clearSearchResults() {
    searchResultsContainer.style.display = "none";
    searchResultsContainer.innerHTML = ''; // Clear content
}

function setSelectedUser(userID, userName) {
    selectedUserID = userID;
    selectedUserName = userName;
    document.getElementById("search-input").value = "";
    getMessages(selectedUserID, selectedUserName);
}

// Event listener for selecting user from search results
searchResultsContainer.addEventListener("click", function (event) {
    let clickedUser = event.target.closest(".search");
    if (clickedUser) {
        let userID = parseInt(clickedUser.getAttribute("data-userID"));
        let userName = clickedUser.textContent.trim();
        setSelectedUser(userID, userName);
        clearSearchResults();
    }
});






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
//for soclet error
socket.on("connect_error", (error) => {
    let er = "Connection error: " + error.message;
    handleResponse(er);
    // Handle the error or take appropriate action
});

//custom error event
socket.on('errorMesage', function () {
    console.log('Connected to server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

//function to send message. Will need to grab the selectedUserID that was stored when the currentuser selected someone to chat with
//trigger socket event for sending message
function sendMessage() {
    let receiverID = parseInt(selectedUserID);
    let content = document.getElementById("chat-input").value;
    if (content !== "" && !isNaN(receiverID)) {
        socket.emit('sendMessage', { receiverID, content });

        //call to display message that was sent
        makeSenderMessage(content);
    }
    else {
        let text = "Please type in input before sending and select a user"
        handleResponse(text);
    }
}

//close error container
function closeErrorContainer() {
    console.log("Closing error container");
    document.getElementById("error-container").style.display = "none";
}

//display error

function handleResponse(data) {
    let errorContainer = document.getElementById("error-container");
    let listErrors = document.getElementById("listed-messages");
    //errorContainer.textContent = '';
    listErrors.textContent = '';

    if (Array.isArray(data.errors)) {
        // Handle array of errors
        data.errors.forEach(error => {
            errorContainer.style.display = "block";
            let errorDiv = document.createElement('li');
            errorDiv.textContent = error;
            listErrors.appendChild(errorDiv);
        });
        errorContainer.appendChild(listErrors);
    } else if (data && data.error) {
        // Handle single error
        errorContainer.style.display = "block";
        let errorDiv = document.createElement('li');
        errorDiv.textContent = data.error;
        listErrors.appendChild(errorDiv);
        errorContainer.appendChild(listErrors);
    } else {
        errorContainer.style.display = "block";
        let errorDiv = document.createElement('li');
        errorDiv.textContent = data;
        listErrors.appendChild(errorDiv);
        errorContainer.appendChild(listErrors);
    }
}