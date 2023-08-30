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
$username = $_POST['user-email'];
$password = $_POST['user-password'];
$userType = $_POST['user-type'];

if($userType == 'STUDENT'){
    $sql = "SELECT StudentID, StudentEmail, StudentPassword FROM STUDENT WHERE StudentEmail = '$username' and StudentPassword = '$password'";
} elseif($userType == 'ADVISOR'){
    $sql = "SELECT AdvisorID, AdvisorEmail, AdvisorPassword FROM ADVISOR WHERE AdvisorEmail = ?";
}


$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
if ($userType == 'STUDENT') {
    $stmt->bind_result($StudentID, $StudentEmail, $StudentPassword);
} elseif ($userType == 'ADVISOR') {
    $stmt->bind_result($AdvisorID, $AdvisorEmail, $AdvisorPassword);  // Use the appropriate column aliases here
}

$stmt->fetch();

// Verify password
if ($userType == 'STUDENT' && password_verify($password, $StudentPassword)) {
    // Password is correct for a student
    $_SESSION['user_id'] = $StudentID;
    $_SESSION['username'] = $StudentEmail;
    header("Location: dashboard.php"); // Redirect to dashboard or another page
} elseif ($userType == 'ADVISOR' && password_verify($password, $AdvisorPassword)) {
    // Password is correct for an advisor
    $_SESSION['user_id'] = $AdvisorID;
    $_SESSION['username'] = $AdvisorEmail;
    header("Location: dashboard.php"); // Redirect to dashboard or another page
} else {
    // Invalid credentials
    header("Location: login.php?error=1"); // Redirect with error
}
$stmt->close();
$conn->close();
?>
