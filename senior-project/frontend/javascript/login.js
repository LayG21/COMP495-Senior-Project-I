// Javascript for login

// Grab form and attach event
let form = document.getElementById("form");

form.addEventListener('submit', handleFormSubmission);

// Form requests
function handleFormSubmission(event) {
    event.preventDefault();

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userType: document.getElementById('usertype').value,
            userEmail: document.getElementById('user-email').value,
            userPassword: document.getElementById('user-password').value,
        }),
    })
        .then(response => {
            // Check if the response is a redirect
            if (response.redirected) {
                window.location.href = response.url;
            }

            // Check if the response is not OK (status code other than 2xx)
            if (!response.ok) {
                return response.json(); // Parse JSON error response
            }

            return response.json(); // Parse successful JSON response
        })
        .then(data => {
            if (data) {
                handleResponse(data); // Handle errors or success
            }
        })
        .catch(error => {
            console.log('Error during login:', error);
        });
}
// Add this function to close the error container
function closeErrorContainer() {
    console.log("Closing error container");
    document.getElementById("error-container").style.display = "none";
}

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
        // Handle success (if needed)
        console.log('Login successful');
    }
}

