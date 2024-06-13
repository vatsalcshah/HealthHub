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
    case "POST":
        $data = json_decode(file_get_contents('php://input'));

        $id = $data->ID;
        $firstName = $data->FirstName;
        $lastName = $data->LastName;
        $email = $data->Email;
        $contactNumber = $data->ContactNumber;

        $sql = "UPDATE tblusers SET FirstName = :firstName, LastName = :lastName, Email = :email, ContactNumber = :contactNumber WHERE ID = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':firstName', $firstName);
        $stmt->bindParam(':lastName', $lastName);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':contactNumber', $contactNumber);

        $response = ['status' => 0, 'message' => 'Failed to update healthcare provider details.'];

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Healthcare provider details updated successfully.'];
        }

        echo json_encode($response);
        break;

    default:
        $response = ['status' => 0, 'message' => 'Invalid request method'];
        echo json_encode($response);
        break;
}
?>
