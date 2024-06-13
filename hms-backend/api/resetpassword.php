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
        $email = $user->email;
        $sql = "SELECT * FROM tblusers WHERE Email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email);

        if ($stmt->execute()) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $code = rand(999999, 111111);
                $userId = $result['ID'];

                $updateCodeSql = "UPDATE tblusers SET code = :code WHERE ID = :userId";
                $updateCodeStmt = $conn->prepare($updateCodeSql);
                $updateCodeStmt->bindParam(':code', $code);
                $updateCodeStmt->bindParam(':userId', $userId);

                if ($updateCodeStmt->execute()) {
                    $subject = "Password Reset Code";
                    $message = "Your password reset code is $code";
                    $sender = "From: your@email.com";

                    if (mail($email, $subject, $message, $sender)) {
                        $info = "We've sent a password reset OTP to your email - $email";
                        $_SESSION['info'] = $info;
                        $_SESSION['email'] = $email;
                        $response = ['status' => 1, 'message' => 'Email sent successfully'];
                    } else {
                        $errors['otp-error'] = "Failed while sending code: " . error_get_last()['message'];
                        $response = ['status' => 0, 'message' => 'Failed to send the password reset email'];
                    }
                    echo json_encode($response);
                } else {
                    $errors['db-error'] = "Something went wrong!";
                }
            } else {
                $errors['email'] = "This email address does not exist!";
            }
        }
        break;
    default:
        $response = ['status' => 0, 'message' => 'Invalid request'];
        echo json_encode($response);
        break;
}
?>
