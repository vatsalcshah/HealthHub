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

$to_id = $_POST["to_id"];
$message = $_POST["message"];
$from_id = $_POST["from_id"];
$datetime = $_POST["datetime"];

$data = array();
$data1 = array();

if (!$message && !$datetime) {
    $sql1 = "SELECT cl.to_id, cl.message, cl.from_id, cl.datetime, u.FirstName
    FROM chat_list cl
    JOIN tblusers u ON u.ID = cl.from_id
    WHERE (cl.to_id=:to_id AND cl.from_id=:from_id) OR (cl.to_id=:from_id AND cl.from_id=:to_id)
    ORDER BY cl.datetime DESC
    LIMIT 10";

    $stmt1 = $conn->prepare($sql1);
    $stmt1->bindParam(':to_id', $to_id, PDO::PARAM_INT);
    $stmt1->bindParam(':from_id', $from_id, PDO::PARAM_INT);
    $stmt1->execute();

    if ($stmt1) {
        $result1 = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($result1)) {
            $res = array("status" => "success", "data" => $result1);
        } else {
            $res = array("status" => "failed", "data" => 'No records found.');
        }
    } else {
        $res = array("failed" => true, "data" => $stmt1->errorInfo());
    }
} else {
    $sql = "INSERT INTO chat_list (to_id, message, from_id, datetime)
            VALUES (:to_id, :message, :from_id, :datetime)";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':to_id', $to_id, PDO::PARAM_INT);
    $stmt->bindParam(':message', $message, PDO::PARAM_STR);
    $stmt->bindParam(':from_id', $from_id, PDO::PARAM_INT);
    $stmt->bindParam(':datetime', $datetime, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt !== false) {
        $sql1 = "SELECT cl.to_id, cl.message, cl.from_id, cl.datetime, u.FirstName
        FROM chat_list cl
        JOIN tblusers u ON u.ID = cl.from_id
        WHERE (cl.to_id=:to_id AND cl.from_id=:from_id) OR (cl.to_id=:from_id AND cl.from_id=:to_id)
        ORDER BY cl.datetime DESC
        LIMIT 10";

        $stmt1 = $conn->prepare($sql1);
        $stmt1->bindParam(':to_id', $to_id, PDO::PARAM_INT);
        $stmt1->bindParam(':from_id', $from_id, PDO::PARAM_INT);
        $stmt1->execute();

        if ($stmt1) {
            $result1 = $stmt1->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($result1)) {
                $res = array("status" => "success", "data" => $result1);
            }
        }
    } else {
        $res = array("failed" => true, "data" => $conn->errorInfo());
    }
}

$res = json_encode($res);
echo $res;
$conn = null;
?>
