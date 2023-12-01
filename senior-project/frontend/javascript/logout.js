// File: logout.js
var logoutLink = document.getElementById('logout-link');

// Add a click event listener to the "Logout" link
logoutLink.addEventListener('click', function (event) {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Call your existing logout function
    logout();
});

function logout() {
    // Fetch to log out
    fetch('/logout', {
        method: 'POST',
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (response.redirected) {
                // Handle the redirect manually
                window.location.href = response.url;
            } else {
                // Continue processing the response
                console.log('Logout successful');
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
            // Optionally handle error
        });
}
