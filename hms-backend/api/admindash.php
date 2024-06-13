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
        }
    }
    
}$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $data = array();
    
        // Total count of UserType = Pharmacist from tblusers
        $sqlPharmacists = "SELECT COUNT(UserType) AS TotalPharmacistCount FROM tblusers WHERE UserType = 'Pharmacist'";
        $stmtPharmacists = $conn->prepare($sqlPharmacists);
        $stmtPharmacists->execute();
        $pharmacistCount = $stmtPharmacists->fetch(PDO::FETCH_ASSOC);
        $data['TotalPharmacistCount'] = $pharmacistCount['TotalPharmacistCount'];
    
        // Total count of UserType = Patient from tblusers
        $sqlPatients = "SELECT COUNT(UserType) AS TotalPatientCount FROM tblusers WHERE UserType = 'Patient'";
        $stmtPatients = $conn->prepare($sqlPatients);
        $stmtPatients->execute();
        $PatientCount = $stmtPatients->fetch(PDO::FETCH_ASSOC);
        $data['TotalPatientCount'] = $PatientCount['TotalPatientCount'];

        // Total count of UserType = HealthAdminstrator from tblusers
        $sqlHealthAdminstrators = "SELECT COUNT(UserType) AS TotalHealthAdminstratorCount FROM tblusers WHERE UserType = 'HealthAdminstrator'";
        $stmtHealthAdminstrators = $conn->prepare($sqlHealthAdminstrators);
        $stmtHealthAdminstrators->execute();
        $HealthAdminstratorCount = $stmtHealthAdminstrators->fetch(PDO::FETCH_ASSOC);
        $data['TotalHealthAdminstratorCount'] = $HealthAdminstratorCount['TotalHealthAdminstratorCount'];
    
         // Total count of UserType = HealthcareProvider from tblusers
        $sqlHealthcareProviders = "SELECT COUNT(UserType) AS TotalHealthcareProviderCount FROM tblusers WHERE UserType = 'HealthcareProvider'";
        $stmtHealthcareProviders = $conn->prepare($sqlHealthcareProviders);
        $stmtHealthcareProviders->execute();
        $HealthcareProviderCount = $stmtHealthcareProviders->fetch(PDO::FETCH_ASSOC);
        $data['TotalHealthcareProviderCount'] = $HealthcareProviderCount['TotalHealthcareProviderCount'];

        echo json_encode($data);
        break;
    
    
}