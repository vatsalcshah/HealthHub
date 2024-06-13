<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

// Database connection class
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

// Create database connection
$objDb = new DbConnect;
$conn = $objDb->connect();

// Check if connection is successful
if (!$conn) {
    // Connection failed, handle error or return appropriate response
    die("Database connection failed.");
}

try {
    // Check if 'id' parameter is provided
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        // Fetch blog with provided id from the tblBlogs table
        $stmt = $conn->prepare("SELECT * FROM tblBlogs WHERE BlogID = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $blog = $stmt->fetch(PDO::FETCH_ASSOC);

        // Return JSON response
        echo json_encode($blog);
    } else {
        // Fetch all blogs if there's no current user
        if (!isset($_SESSION['UserID'])) {
            $stmt = $conn->prepare("SELECT * FROM tblBlogs");
            $stmt->execute();
            $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            // Fetch blogs for the current user from the tblBlogs table
            $userId = $_SESSION['UserID']; // Assuming you store UserID in session
            $stmt = $conn->prepare("SELECT * FROM tblBlogs WHERE UserID = :userId");
            $stmt->bindParam(':userId', $userId);
            $stmt->execute();
            $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        // Return JSON response
        echo json_encode($blogs);
    }
} catch (\PDOException $e) {
    // Handle database error
    echo "Database Error: " . $e->getMessage();
}
?>
