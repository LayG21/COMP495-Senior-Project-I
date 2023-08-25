<?php
require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__); // Load environment variables from .env file
$dotenv->load();


session_start();

// Database connection setup
$dbHost = "localhost";
$dbUser = "root";
$dbPass = getenv("DB_PASSWORD"); // Retrieve password from environment variable;
$dbName = "STUDENT_ADVISOR_WEBAPP";

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
