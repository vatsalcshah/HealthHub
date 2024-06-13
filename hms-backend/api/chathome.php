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

if (isset($_GET["ID"])) {
    $ID = $_GET["ID"];
    $data1 = array();
    $sql = "SELECT * FROM tblusers WHERE ID != :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $ID, PDO::PARAM_INT);

    if ($stmt->execute()) {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($result)) {
            $res = array("status" => "success", "data" => $result);
        } else {
            $res = array("status" => "failed", "data" => 'No records found.');
        }
    } else {
        $res = array("status" => "failed", "data" => $stmt->errorInfo());
    }

    echo json_encode($res);
} else {
    $res = array("status" => "failed", "data" => 'Missing ID parameter.');
    echo json_encode($res);
}

$conn = null;
?>
