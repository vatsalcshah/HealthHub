<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

// Handle preflight request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // End script execution for preflight request
    exit(0);
}

class DbConnect {
    private $server = 'localhost';
    private $dbname = 'YOUR_DATABASE_NAME';
    private $user = 'YOUR_DB_USERNAME';
    private $pass = 'YOUR_DB_PASSWORD';

    public function connect() {
        try {
            $conn = new PDO("mysql:host=$this->server;dbname=$this->dbname", $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            // Log error or handle as appropriate
            error_log($e->getMessage());
            // Send a generic error message to the client
            http_response_code(500);
            echo json_encode(['error' => 'Internal Server Error']);
            exit();
        }
    }
}

$objDb = new DbConnect();
$conn = $objDb->connect();

$data = json_decode(file_get_contents('php://input'), true);

// Basic input validation or sanitization
$UserID = filter_var($data['userId'], FILTER_VALIDATE_INT);
if ($UserID === false) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid user ID']);
    exit();
}

$checkSql = "SELECT * FROM tblpersonalrecords WHERE UserID = :UserID";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bindParam(':UserID', $UserID, PDO::PARAM_INT);
$checkStmt->execute();

// Prepare SQL based on whether record exists
if ($checkStmt->fetch(PDO::FETCH_ASSOC)) {
    $sql = "UPDATE tblpersonalrecords SET BP = :BP, Diabetes = :Diabetes, HeartHealthIssues = :HeartHealthIssues, Arthritis = :Arthritis, Allergies = :Allergies, OtherIssues = :OtherIssues WHERE UserID = :UserID";
} else {
    $sql = "INSERT INTO tblpersonalrecords (UserID, BP, Diabetes, HeartHealthIssues, Arthritis, Allergies, OtherIssues) VALUES (:UserID, :BP, :Diabetes, :HeartHealthIssues, :Arthritis, :Allergies, :OtherIssues)";
}

$stmt = $conn->prepare($sql);
$stmt->bindParam(':UserID', $UserID, PDO::PARAM_INT);
$stmt->bindParam(':BP', $data['BP']);
$stmt->bindParam(':Diabetes', $data['Diabetes']);
$stmt->bindParam(':HeartHealthIssues', $data['HeartHealthIssues']);
$stmt->bindParam(':Arthritis', $data['Arthritis']);
$stmt->bindParam(':Allergies', $data['Allergies']);
$stmt->bindParam(':OtherIssues', $data['OtherIssues']);

// Execute and respond
if ($stmt->execute()) {
    echo json_encode(['success' => 'Health record saved successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save health record.']);
}
?>
