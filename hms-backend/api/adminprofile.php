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

class DbConnect {
    private $server = 'localhost';
    private $dbname = 'YOUR_DATABASE_NAME';
    private $user = 'YOUR_DB_USERNAME';
    private $pass = 'YOUR_DB_PASSWORD';

    public function connect() {
        try {
            $conn = new PDO("mysql:host={$this->server};dbname={$this->dbname}", $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (Exception $e) {
            // Log error message for server admin, send generic message to client
            error_log($e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Internal Server Error']);
            exit;
        }
    }
}

$objDb = new DbConnect();
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGetRequest($conn);
        break;
    default:
        // Method not supported
        http_response_code(405);
        echo json_encode(['message' => 'Method Not Allowed']);
        break;
}

function handleGetRequest($conn) {
    $sql = "SELECT FirstName, LastName, Email, ID, ContactNumber FROM tblusers";
    $params = [];

    $path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
    $idIndex = array_search('php', $path) + 2; // Adjust based on actual URL structure

    if (isset($path[$idIndex]) && is_numeric($path[$idIndex])) {
        $sql .= " WHERE ID = :id";
        $params[':id'] = $path[$idIndex];
    }

    $stmt = $conn->prepare($sql);

    foreach ($params as $key => &$val) {
        $stmt->bindParam($key, $val);
    }

    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($users);
}
