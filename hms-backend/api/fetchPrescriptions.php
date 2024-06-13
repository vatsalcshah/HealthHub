<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

class DbConnect {
    private $server = 'localhost';
    private $dbname = 'YOUR_DATABASE_NAME';
    private $user = 'YOUR_DB_USERNAME';
    private $pass = 'YOUR_DB_PASSWORD';

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
            return null;
        }
    }
}

// Function to fetch prescriptions by UserID
function fetchPrescriptionsByUserID($conn, $userID) {
    try {
        // Prepare SQL statement to fetch prescriptions by UserID
        $stmt = $conn->prepare("SELECT * FROM tblPrescriptions WHERE user_id = :userID");
        $stmt->bindParam(':userID', $userID);
        $stmt->execute();

        // Fetch prescriptions as associative array
        $prescriptions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return the prescriptions
        return $prescriptions;
    } catch (\Exception $e) {
        // Handle database error
        echo json_encode(array("error" => "Database Error: " . $e->getMessage()));
        return null;
    }
}

// Create database connection
$objDb = new DbConnect;
$conn = $objDb->connect();

// Check if connection is successful
if (!$conn) {
    // Connection failed, handle error or return appropriate response
    die("Database connection failed.");
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve UserID from request parameters (assuming it's passed as a query parameter)
    $userID = isset($_GET['userID']) ? $_GET['userID'] : null;

    // Check if UserID is provided
    if ($userID !== null) {
        // Fetch prescriptions for the given UserID
        $prescriptions = fetchPrescriptionsByUserID($conn, $userID);

        // Check if prescriptions were found
        if ($prescriptions !== null) {
            // Encode prescriptions as JSON and output
            echo json_encode($prescriptions);
        }
    } else {
        // UserID not provided, return error response
        echo json_encode(array("error" => "UserID is required."));
    }
}
?>
