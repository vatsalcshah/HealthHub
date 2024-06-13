import './css/component.css';
import './css/default.css';
import './css/style.css';
import './css/adminStyle.css';
import './css/chat.css'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Fab } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';


import Footer from './components/Footer';

//MainPages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';

//User Authentication
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VerifyOTP from './pages/VerifyOTP';
import VerifyResetOTP from './pages/VerifyResetOTP';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Chat from './pages/chat';

import ManagePatientAdmin from './pages/admin/ManagePatientAdmin';
import ManagePharmacistAdmin from './pages/admin/ManagePharmacistAdmin';
import ManageHealthcareProviders from './pages/admin/ManageHealthcareProviders';
import ManageHealthAdmins from './pages/admin/ManageHealthAdmins';
import ProfileAdmin from './pages/admin/AdminProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import DataOversight from './pages/admin/DataOversight';


import PharmacistProfile from './pages/Pharmacist/PharmacistProfile';
import PharmacistPrescriptionForm from './pages/Pharmacist/PharmacistPrescriptionForm';
import PharmacistPersonalRecords from './pages/Pharmacist/PharmacistPersonalRecords';

import ProfileHealthAdministrator from './pages/HealthAdministrator/ProfileHealthAdministrator';
import FacilitiesPage from './pages/HealthAdministrator/FacilitiesPage';
import HAdminDataOversight from './pages/HealthAdministrator/HAdminDataOversight';
import HAdminManageHealthcareProviders from './pages/HealthAdministrator/HAdminManageHealthcareProviders';
import HAdminManagePharmacistAdmin from './pages/HealthAdministrator/HAdminManagePharmacistAdmin';

import HealthcareProviderProfile from './pages/HealthcareProvider/HealthcareProviderProfile';
import PrescriptionForm from './pages/HealthcareProvider/PrescriptionForm';
import ManageAppointments from './pages/HealthcareProvider/ManageAppointments';
import PersonalRecords from './pages/HealthcareProvider/PersonalRecords';
import HealthcareProviderCommunity from './pages/HealthcareProvider/HealthcareProviderCommunity'
import HealthcareProviderSingleBlogPage from './pages/HealthcareProvider/HealthcareProviderSingleBlogPage'
import HealthcareProviderMyBlogs from './pages/HealthcareProvider/HealthcareProviderMyBlogs'
import HealthcareProviderAddBlog from './pages/HealthcareProvider/HealthcareProviderAddBlog'
import HealthcareProviderDashboard from './pages/HealthcareProvider/HealthcareProviderDashboard'


//PatientPages
import PatientProfile from './pages/user/patient-profile';
import HealthRecordPage from './pages/user/HealthRecordPage';
import SymptomChecker from './pages/user/SymptomChecker';
import MedicationReminder from './pages/user/MedicationReminder';
import AppointmentsPage from './pages/user/AppointmentsPage'
import PatientCommunity from './pages/user/PatientCommunity'
import PatientSingleBlogPage from './pages/user/PatientSingleBlogPage'
import PatientMyBlogs from './pages/user/PatientMyBlogs'
import PatientAddBlog from './pages/user/PatientAddBlog'
import PatientPrescription from './pages/user/PatientPrescription'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Services" element={<Services />} />

        <Route path="/Login" element={<Login />} />
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/VerifyOTP' element={<VerifyOTP/>}/>
        <Route path='/VerifyResetOTP' element={<VerifyResetOTP/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/ResetPassword' element={<ResetPassword/>}/>

        <Route path="/Chat" element={<Chat/>} />

        <Route path="/ManagePatientAdmin" element={<ManagePatientAdmin />} />
        <Route path="/ManagePharmacistAdmin" element={<ManagePharmacistAdmin />} />
        <Route path="/ManageHealthcareProviders" element={<ManageHealthcareProviders />} />
        <Route path="/ManageHealthAdmins" element={<ManageHealthAdmins />} />
        <Route path="/ProfileAdmin" element={<ProfileAdmin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/DataOversight" element={<DataOversight />} />

        <Route path="/PharmacistProfile" element={<PharmacistProfile />} />
        <Route path="/PharmacistPrescriptionForm" element={<PharmacistPrescriptionForm />} />
        <Route path="/PharmacistPersonalRecords" element={<PharmacistPersonalRecords />} />

        <Route path="/ProfileHealthAdministrator" element={<ProfileHealthAdministrator />} />
        <Route path="/FacilitiesPage" element={<FacilitiesPage />} />
        <Route path="/HAdminDataOversight" element={<HAdminDataOversight />} />
        <Route path="/HAdminManageHealthcareProviders" element={<HAdminManageHealthcareProviders />} />
        <Route path="/HAdminManagePharmacistAdmin" element={<HAdminManagePharmacistAdmin />} />

        <Route path="/HealthcareProviderProfile" element={<HealthcareProviderProfile />} />
        <Route path="/PrescriptionForm" element={<PrescriptionForm />} />
        <Route path="/ManageAppointments" element={<ManageAppointments />} />
        <Route path="/PersonalRecords" element={<PersonalRecords />} />
        <Route path="/HealthcareProviderCommunity" element={<HealthcareProviderCommunity />} />
        <Route path="/HealthcareProviderSingleBlogPage/:id" element={<HealthcareProviderSingleBlogPage />} />
        <Route path="/HealthcareProviderMyBlogs" element={<HealthcareProviderMyBlogs />} />
        <Route path="/HealthcareProviderAddBlog" element={<HealthcareProviderAddBlog />} />
        <Route path="/HealthcareProviderDashboard" element={<HealthcareProviderDashboard />} />

        <Route path="/PatientProfile" element={<PatientProfile />} />
        <Route path="/HealthRecordPage" element={<HealthRecordPage />} />
        <Route path="/SymptomChecker" element={<SymptomChecker />} />
        <Route path="/MedicationReminder" element={<MedicationReminder />} />
        <Route path="/AppointmentsPage" element={<AppointmentsPage />} />
        <Route path="/PatientCommunity" element={<PatientCommunity />} />
        <Route path="/PatientSingleBlogPage/:id" element={<PatientSingleBlogPage />} />
        <Route path="/PatientMyBlogs" element={<PatientMyBlogs />} />
        <Route path="/PatientAddBlog" element={<PatientAddBlog />} />
        <Route path="/PatientPrescription" element={<PatientPrescription />} />


      </Routes>
      <Fab
          component={Link}
          to="/MedicationReminder"
          color="primary"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <NotificationsIcon />
        </Fab>
      <Footer />
    </Router>
  );
}

export default App;
