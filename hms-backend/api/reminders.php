<?php

// Set CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // No further action is needed for OPTIONS request
    http_response_code(200);
    exit();
}

// DbConnect class for database connection
class DbConnect {
    private $server = 'localhost';
    private $dbname = 'YOUR_DATABASE_NAME';
    private $user = 'YOUR_DB_USERNAME';
    private $pass = 'YOUR_DB_PASSWORD';
    private $conn;

    // Constructor
    function __construct() {
        $this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    // Function to add a new reminder
    function addReminder($userID, $reminderName, $reminderTime) {
        $sql = "INSERT INTO tblreminders (userID, reminderName, reminderTime) VALUES ('$userID', '$reminderName', '$reminderTime')";
        if ($this->conn->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }

    // Function to fetch reminders for a specific user
    function fetchReminders($userID) {
        $sql = "SELECT * FROM tblreminders WHERE userID = '$userID'";
        $result = $this->conn->query($sql);
        $reminders = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $reminders[] = $row;
            }
        }
        return $reminders;
    }

    // Function to delete a reminder
    function deleteReminder($reminderID) {
        $sql = "DELETE FROM tblreminders WHERE reminderID = '$reminderID'";
        if ($this->conn->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }
}

// Create an instance of the DbConnect class
$dbConnect = new DbConnect();

// Handle POST request to add a new reminder
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $userID = $data['userID'];
    $reminderName = $data['reminderName'];
    $reminderTime = $data['reminderTime'];
    $result = $dbConnect->addReminder($userID, $reminderName, $reminderTime);
    echo json_encode($result);
}

// Handle GET request to fetch reminders for a specific user
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['userID'])) {
        $userID = $_GET['userID'];
        $reminders = $dbConnect->fetchReminders($userID);
        echo json_encode($reminders);
    }
}

// Handle DELETE request to delete a reminder
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['reminderID'])) {
        $reminderID = $_GET['reminderID'];
        $result = $dbConnect->deleteReminder($reminderID);
        echo json_encode($result);
    }
}

?>
