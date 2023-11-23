//File used by each html page to logout the user
var logoutLink = document.getElementById('logout-link');

// Add a click event listener to the "Logout" link
logoutLink.addEventListener('click', function (event) {
    // Prevent the default behavior of the link (e.g., navigating to "#" in this case)
    console.log('Logout link clicked');
    event.preventDefault();

    // Call your existing logout function
    logout();
});

function logout() {
    console.log('Logging out');
    fetch('/logout', {
        method: 'POST',
        credentials: 'include',
    })
        .then(response => {
            if (response.ok || response.status === 302) {
                // Handle success or redirect status
                window.location.href = response.url || '/index';
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
            // Optionally handle error
        });
}