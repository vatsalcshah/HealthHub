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

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read and decode the JSON request body
    $data = json_decode(file_get_contents("php://input"), true);

    try {
        // Prepare and execute the SQL statement to insert the comment
        $stmt = $conn->prepare("INSERT INTO tblComments (BlogID, UserID, Comment) VALUES (:blogId, :userId, :comment)");
        $stmt->bindParam(':blogId', $data['blogId']);
        $stmt->bindParam(':userId', $data['userId']);
        $stmt->bindParam(':comment', $data['comment']);
        $stmt->execute();

        // Return success response
        echo json_encode(array("message" => "Comment added successfully."));
    } catch (\PDOException $e) {
        echo "Database Error: " . $e->getMessage();
    }
}
?>
