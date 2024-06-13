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
            $conn = new PDO("mysql:host=$this->server;dbname=$this->dbname", $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (Exception $e) {
            exit("Database Error: " . $e->getMessage());
        }
    }
}

$objDb = new DbConnect();
$conn = $objDb->connect();

function sendJSON($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Fetch all appointments and update their statuses if the date has passed
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Fetch all appointments
        $sql = "SELECT * FROM tblAppointments";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Check and update the status based on the current date
        foreach ($appointments as &$appointment) {
            if ($appointment['Status'] === 'Scheduled' && new DateTime($appointment['AppointmentDate']) < new DateTime()) {
                $appointment['Status'] = 'Completed';
                $sqlUpdate = "UPDATE tblAppointments SET Status = 'Completed' WHERE AppointmentID = ?";
                $stmtUpdate = $conn->prepare($sqlUpdate);
                $stmtUpdate->execute([$appointment['AppointmentID']]);
            }
        }
        unset($appointment);
        
        sendJSON($appointments);
    } catch (Exception $e) {
        sendJSON(['error' => $e->getMessage()], 500);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'];

    try {
        if ($action === 'edit') {
            // Edit an existing appointment
            $sql = "UPDATE tblAppointments SET PatientID = ?, DoctorName = ?, AppointmentDate = ?, TimeSlot = ?, Description = ? WHERE AppointmentID = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                $data['patientId'],
                $data['doctorName'],
                $data['appointmentDate'],
                $data['timeSlot'],
                $data['description'],
                $data['appointmentId']
            ]);
            sendJSON(['message' => 'Appointment updated successfully.']);
        } elseif ($action === 'delete') {
            // Delete an appointment
            $sql = "UPDATE tblAppointments SET Status = 'Cancelled' WHERE AppointmentID = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$data['appointmentId']]);
            sendJSON(['message' => 'Appointment cancelled successfully.']);
        } elseif ($action === 'updateStatus') {
            // Update the status of an appointment
            $sql = "UPDATE tblAppointments SET Status = ? WHERE AppointmentID = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                $data['newStatus'],
                $data['appointmentId']
            ]);
            sendJSON(['message' => 'Appointment status updated successfully.']);
        }
    } catch (Exception $e) {
        sendJSON(['error' => $e->getMessage()], 500);
    }
}

$conn = null;
?>
