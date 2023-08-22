<?php
session_start();

// Database connection setup
$dbHost = "your_database_host";
$dbUser = "your_database_username";
$dbPass = "your_database_password";
$dbName = "your_database_name";

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user input
$username = $_POST['username'];
$password = $_POST['password'];

// Retrieve hashed password from the database
$sql = "SELECT id, username, password_hash FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($userId, $dbUsername, $dbPasswordHash);
$stmt->fetch();

// Verify password
if (password_verify($password, $dbPasswordHash)) {
    // Password is correct
    $_SESSION['user_id'] = $userId;
    $_SESSION['username'] = $dbUsername;
    header("Location: dashboard.php"); // Redirect to dashboard or another page
} else {
    // Invalid credentials
    header("Location: login.php?error=1"); // Redirect with error
}

$stmt->close();
$conn->close();
?>
