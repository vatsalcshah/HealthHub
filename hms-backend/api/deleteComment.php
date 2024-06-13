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
        }
    }
}

$objDb = new DbConnect;
$conn = $objDb->connect();

if (!$conn) {
    die("Database connection failed.");
}

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Read and decode the JSON request body
    $data = json_decode(file_get_contents("php://input"), true);

    try {
        // Prepare and execute the SQL statement to delete the comment
        $stmt = $conn->prepare("DELETE FROM tblComments WHERE CommentID = :commentId");
        $stmt->bindParam(':commentId', $data['commentId']);
        $stmt->execute();

        // Return success response
        echo json_encode(array("message" => "Comment deleted successfully."));
    } catch (\PDOException $e) {
        echo "Database Error: " . $e->getMessage();
    }
}
?>
