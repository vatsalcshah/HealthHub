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

        // Retrieve data from the payload
        $name = $data->name;
        $medicines = json_encode($data->medicines); // Convert array to JSON string
        $prescribedBy = $data->prescribedBy;
        $pharmacist = $data->pharmacist;
        $userId = $data->user_id;

        try {
            // Prepare and bind parameters
            $stmt = $conn->prepare("INSERT INTO tblPrescriptions (name, medicines, prescribedBy, pharmacist, user_id) VALUES (?, ?, ?, ?, ?)");
            $stmt->bindParam(1, $name);
            $stmt->bindParam(2, $medicines);
            $stmt->bindParam(3, $prescribedBy);
            $stmt->bindParam(4, $pharmacist);
            $stmt->bindParam(5, $userId, PDO::PARAM_INT); // Specify data type as integer

            // Execute the query
            $stmt->execute();

            // Check if the query was successful
            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Prescription added successfully.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error: Unable to add prescription.']);
            }
        } catch (\PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Database Error: ' . $e->getMessage()]);
        }
        break;

    default:
        $response = ['status' => 0, 'message' => 'Invalid request method'];
        echo json_encode($response);
        break;
}
?>
