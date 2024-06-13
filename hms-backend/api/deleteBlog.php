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
            $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
            return null;
        }
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

// Logic to handle DELETE request for deleting blog
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Retrieve data from request body (assuming JSON format)
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate data (e.g., check if all required fields are present)

    // Retrieve blog ID from request body
    $blogId = $data['blogId'];

    // Delete the blog from the database
    try {
        $stmt = $conn->prepare("DELETE FROM tblBlogs WHERE BlogID = :blogId");
        $stmt->bindParam(':blogId', $blogId);
        $stmt->execute();

        // Return success response
        echo json_encode(array("message" => "Blog deleted successfully"));
    } catch (PDOException $e) {
        // Handle database error
        echo json_encode(array("error" => "Database Error: " . $e->getMessage()));
    }
}
?>
