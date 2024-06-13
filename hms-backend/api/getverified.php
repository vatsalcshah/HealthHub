<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Access-Control-Allow-Origin: http://localhost:3000');

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
            exit(); // Exit script if connection fails
        }
    }
}

$objDb = new DbConnect;
$conn = $objDb->connect();

// Initialize user counts
$userCounts = [
    'Admin' => ['not_verified_count' => 0, 'verified_count' => 0],
    'Patient' => ['not_verified_count' => 0, 'verified_count' => 0],
    'HealthcareProvider' => ['not_verified_count' => 0, 'verified_count' => 0],
    'Pharmacist' => ['not_verified_count' => 0, 'verified_count' => 0],
    'HealthAdministrator' => ['not_verified_count' => 0, 'verified_count' => 0]
];

// Fetch counts for each UserType
foreach ($userCounts as $userType => $counts) {
    // Fetch number of users with status == "notverified" for the specified UserType
    $sqlNotVerified = "SELECT COUNT(*) AS count_notverified FROM tblusers WHERE status = 'notverified' AND UserType = :userType";
    $stmtNotVerified = $conn->prepare($sqlNotVerified);
    $stmtNotVerified->bindParam(':userType', $userType);
    $stmtNotVerified->execute();
    $notVerifiedCount = $stmtNotVerified->fetchColumn();
    
    // Fetch number of users with status == "verified" for the specified UserType
    $sqlVerified = "SELECT COUNT(*) AS count_verified FROM tblusers WHERE status = 'verified' AND UserType = :userType";
    $stmtVerified = $conn->prepare($sqlVerified);
    $stmtVerified->bindParam(':userType', $userType);
    $stmtVerified->execute();
    $verifiedCount = $stmtVerified->fetchColumn();
    
    // Update user counts array
    $userCounts[$userType]['not_verified_count'] = $notVerifiedCount;
    $userCounts[$userType]['verified_count'] = $verifiedCount;
}

echo json_encode($userCounts);
?>
