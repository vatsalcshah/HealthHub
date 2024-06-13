# 💊 HealthHub: Integrated Healthcare Ecosystem
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


![Homepage](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Homepage.png)

HealthHub is a full-stack healthcare management platform developed over a **7-day coding challenge**. It seamlessly connects patients, healthcare providers, pharmacists, and administrators, providing a user-friendly interface for various healthcare needs.

## Technologies Used
<table border="1">
  <tr>
    <th align="center">Frontend</th>
    <th align="center">Backend</th>
    <th align="center">Database</th>
    <th align="center">Styling</th>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></td>
    <td align="center"><img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" /></td>
    <td align="center"><img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" /></td>
    <td align="center"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" /></td>
  </tr>
</table>

## ✨ Features
**1. Full User Authentication:**
![SignUp](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Signup_Errors.png)
	![enter image description here](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/ForgotPassword.png)
		![OTP Verification](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/OTP.png)
		![OTP Email](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/OTP_Email.png)
		Email Verification via OTP
		
**2. Full Responsive**
![PatientProfilePage](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Patient_Profile.png)

![Sidebar](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Sidebar.png)
		
**3. Attractive & dynamic pages**
![ServicesPage](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/ServicesPage.png)

![UpdateValues](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Facilities.png)

**4. Personal Health Records**
![PersonalHealthRecords](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/PersonalHealthRecords.png)

**5. Symptoms Checker**
![SymptomsChecker](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/SystomChecker.png)

**6. Medication Reminder**
![MedicationReminder1](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/MedicationReminder.png)

![MedicationReminder2](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/MedicationReminder2.png)

![ReminderBackend](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/RemindersTable.png)

**7. Book & Manage Appointments**
![Appointments](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/AppointmentsPage.png)

![AppointmentsBackend](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/AppointmentsTable.png)

**8. Blogging Community**
![Blog1](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/CreateBlog.png)

![Blog2](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Community.png)

![Blog3](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/ManageBlogs.png)

![Blog4](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/BlogComments.png)

![BlogsBackend](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/BlogsTable.png)

**9. Prescription Management**
![Prescription](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Prescription.png)

![AddPrescriptions](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/AddPrescriptions.png)

![PrescriptionBackend](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/PrescriptionTable.png)

**10. Chat with all users**
![Chat](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Chat.png)

**& Much more like user management from frontend**
![Edit1](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Edit.png)

![Edit2](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Edit2.png)

![ManagePatients](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/ManagePatients.png)

![ServerStatus](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/UserData.png)

![UsersDetails](https://github.com/vatsalcshah/HealthHub/blob/main/Screenshots/Users.png)

## 🛠️ Setup & Development

**📋 Requirements:**

Before you begin, make sure you have the following installed on your system:

-   **Node.js and npm:**  You can download Node.js from the official website ([https://nodejs.org/](https://nodejs.org/))
-   **Text Editor or IDE:**  (e.g., VS Code, Atom)
-   **(For Local Hosting):**  XAMPP or Similar
-   **(For Cloud Deployment):**  An account with your chosen hosting provider.

 ## **⚛️ Launching Your React Development Environment**
Use your terminal (e.g., VS Code's) to run the following commands:
1.  **Clone the Repository:**
    ```
    git clone https://github.com/vatsalcshah/HealthHub.git
    cd HealthHub
    cd hms-frontend
    cd hms-website
    ```
 2. **🔍 Bulk Search & Replace:**

	You need to update endpoints , use your code editor's "Find and Replace" feature (often Ctrl/Cmd + Shift + F). Replace instances of `https://example.com` with the actual URL of your hosted API or `http://localhost` (if locally hosted API).
		 
3.  **Install Dependencies:**
    ```
    npm install
    ```    
4.  **Run the Development Server:**
    
    ```
    npm start
    ```
> Open [http://localhost:3000](http://localhost:3000/) in your browser to see the app.


## 📂 Database Configuration

1.  **Import Database:**
    
    -   Import the provided  `my_table.sql`  file into your phpMyAdmin setup.
2.  **Update API Connection in .PHP Files (hms-backend/api):**
    
    -   **Localhost:**
        -   In your API files, ensure these settings are correct:            
            ```
            private $server = 'localhost';
            private $dbname = 'YOUR_DATABASE_NAME';
            private $user = 'YOUR_DB_USERNAME';
            private $pass = 'YOUR_DB_PASSWORD';
            ```
  <br>
           
>   **Cloud Hosting (to avoid CORS errors):**
           Replace  `header('Access-Control-Allow-Origin: http://localhost:3000');`
        <br> 
           With  `header('Access-Control-Allow-Origin: http://example.com');`
           (Substitute  `http://example.com`  with your actual domain)


## 🌐 Deployment

### Deploying the React App

1.  **Build for Production:**    
    ```
    npm run build
    ```
    
2.  **Choose Your Hosting:**
    
    > Tip: Select a hosting provider (Hostinger, Netlify, Vercel, etc.).
    
    -   Follow their specific instructions to deploy the contents of the  `build`  folder. 
    >(Usually you paste the contents of build folder in public_html and also paste the given .htaccess and api folder in same location)


