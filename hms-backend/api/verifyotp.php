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
            exit();
        }
    }
}

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        if (isset($_POST['check'])) {
            session_start();
            $_SESSION['info'] = '';
            $otp_code = $_POST['otp']; // Assuming OTP is sent directly
            $check_code = "SELECT * FROM tblusers WHERE code = :otp_code";
            $stmt = $conn->prepare($check_code);
            $stmt->bindParam(':otp_code', $otp_code);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $fetch_data = $stmt->fetch(PDO::FETCH_ASSOC);
                $fetch_code = $fetch_data['code'];
                $code = 0;
                $status = 'verified';
                $update_otp = "UPDATE tblusers SET code = :code, status = :status WHERE code = :fetch_code";
                $stmt = $conn->prepare($update_otp);
                $stmt->bindParam(':code', $code);
                $stmt->bindParam(':status', $status);
                $stmt->bindParam(':fetch_code', $fetch_code);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    $response = ['status' => 1, 'message' => 'OTP verification successful'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update OTP'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'Incorrect OTP'];
            }

            echo json_encode($response);
        }
        break;

    default:
        $response = ['status' => 0, 'message' => 'Invalid request'];
        echo json_encode($response);
        break;
}
