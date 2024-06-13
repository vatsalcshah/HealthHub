<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

// Removed session_start() since we don't need the session for email

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
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

        // Proceed with the password change based on email
        $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
        $cpassword = filter_input(INPUT_POST, 'cpassword', FILTER_SANITIZE_STRING);

        if ($password !== $cpassword) {
            $response = [
                'status' => 0,
                'message' => 'Confirm password not matched!',
            ];
        } else {
            $code = 0;
            $update_pass = "UPDATE tblusers SET code = :code, password = :pass WHERE email = :email";
            $stmt = $conn->prepare($update_pass);
            $stmt->bindParam(':code', $code);
            $stmt->bindParam(':pass', $password);
            $stmt->bindParam(':email', $email);

            if ($stmt->execute()) {
                $info = "Your password has been changed. Now you can login with your new password.";
                $response = [
                    'status' => 1,
                    'message' => 'Password changed successfully',
                ];
            } else {
                $response = [
                    'status' => 0,
                    'message' => 'Failed to change your password!',
                ];
            }
        }

        echo json_encode($response);
        break;
    default:
        $response = ['status' => 0, 'message' => 'Invalid request'];
        echo json_encode($response);
        break;
}
?>
