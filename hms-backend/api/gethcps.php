<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Access-Control-Allow-Origin: http://localhost:3000');

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
        }
    }
}

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $userType = "HealthcareProvider";
        $sql = "SELECT ID, FirstName, LastName, Email, ContactNumber, status FROM tblusers WHERE UserType = :userType";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':userType', $userType);
        $stmt->execute();
        $healthcareProviders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($healthcareProviders);
        break;

    case "POST":
        $data = json_decode(file_get_contents('php://input'));
        $id = $data->ID;

        // Toggle status between 'verified' and 'notverified'
        $toggleStatusSql = "UPDATE tblusers SET status = CASE WHEN status = 'verified' THEN 'notverified' ELSE 'verified' END WHERE ID = :id";
        $toggleStatusStmt = $conn->prepare($toggleStatusSql);
        $toggleStatusStmt->bindParam(':id', $id);

        $response = ['status' => 0, 'message' => 'Failed to toggle account status.'];

        if ($toggleStatusStmt->execute()) {
            $response = ['status' => 1, 'message' => 'Account status toggled successfully.'];
        }

        echo json_encode($response);
        break;

    default:
        $response = ['status' => 0, 'message' => 'Invalid request method'];
        echo json_encode($response);
        break;
}
?>
