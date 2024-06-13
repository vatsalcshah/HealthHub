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

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "SELECT UserType, ID, status FROM tblusers WHERE ID = :userId AND Password = :password";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':userId', $user->username);
        $stmt->bindParam(':password', $user->password);
        if ($stmt->execute()) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $status = $result['status'];
                if ($status === 'verified') {
                    $response = [
                        'status' => 1,
                        'message' => 'Login successful',
                        'UserType' => $result['UserType'],
                        'ID' => $result['ID'],
                    ];
                } else {
                    $info = "It looks like you haven't verified your account yet.";
                    $response = ['status' => 0, 'message' => $info];
                }
            } else {
                $response = [
                    'status' => 0,
                    'message' => 'Incorrect user ID or password',
                ];
            }
            echo json_encode($response);
        }
        break;
    default:
        $response = ['status' => 0, 'message' => 'Invalid request'];
        echo json_encode($response);
        break;
}
