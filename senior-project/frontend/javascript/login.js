//Javascript for login

//grab form and attach event
let form = document.getElementById("form");

form.addEventListener('submit', handleFormSubmission);

//form requests
function handleFormSubmission(event) {
    event.preventDefault();

    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            userEmail: document.getElementById('user-email').value,
            userPassword: document.getElementById('user-password').value,
            userType: document.getElementById('usertype').value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            handleResponse(data);
        })
        .catch(error => {
            console.log('Error during login:', error);
        });
}

function handleResponse(data) {
    if (data.errors) {
        // Display validation errors
        console.log(data.errors);
        // Example: Update the DOM to display error messages
    } else if (data.error) {
        // Display other errors (e.g., authentication error)
        console.log(data.error);
        // Example: Update the DOM to display error messages
    } else {
        // Handle successful login, e.g., redirect to a new page
        console.log('Login successful');
        window.location.href = '/home.html';
    }
}