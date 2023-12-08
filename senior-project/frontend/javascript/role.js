//file to remove links that are not for the users role
document.addEventListener('DOMContentLoaded', (event) => {
    getRole();
});

function updateNavigation(userRole) {
    const navItems = document.querySelectorAll('.links li');
    Role = userRole
    navItems.forEach((item) => {
        const role = item.getAttribute('data-role');
        if (role && role !== userRole) {
            item.remove(); // Remove the navigation item from the DOM if the role doesn't match
        }
    });
}
//fetch request to get role
function getRole() {
    fetch(`/user/role`, {
        method: 'GET',
        credentials: "include",
    })
        .then(response => {
            return response.json();
        })
        .then((data) => {
            updateNavigation(data.role);
        })
        .catch(error => {
            console.log("Error in getting role");
        });
}
