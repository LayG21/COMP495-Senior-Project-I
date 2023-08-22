<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php"); // Redirect to login page
    exit();
}

// Display dashboard content
echo "Welcome, " . $_SESSION['username'];
?>
