import React, { useState, useEffect } from 'react';
import HealthcareProviderSidebar from '../../components/HealthcareProviderSidebar';

function PrescriptionForm() {
  // State variables
  const [patients, setPatients] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedPharmacist, setSelectedPharmacist] = useState('');
  const [medicineList, setMedicineList] = useState([]);
  const [prescriptionName, setPrescriptionName] = useState('');
  const [prescribedBy, setPrescribedBy] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch patients and pharmacists on component mount
  useEffect(() => {
    fetchPatients();
    fetchPharmacists();
  }, []);

  // Fetch patients data
  const fetchPatients = async () => {
    try {
      const response = await fetch('https://example.com/api/getpatients.php');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Fetch pharmacists data
  const fetchPharmacists = async () => {
    try {
      const response = await fetch('https://example.com/api/getpharmacists.php');
      const data = await response.json();
      setPharmacists(data);
    } catch (error) {
      console.error('Error fetching pharmacists:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure selectedPatient (userId) is not empty
    if (!selectedPatient) {
      setErrorMessage('Error: Patient ID is required.');
      return;
    }

    // Convert selectedPatient to integer
    const userId = parseInt(selectedPatient, 10);

    // Remove newline characters from medicines array
    const sanitizedMedicines = (medicineList || []).map(medicine => medicine.trim().replace(/\r?\n|\r/g, ''));

    // Construct pharmacist's full name
    const selectedPharmacistObj = pharmacists.find(pharmacist => pharmacist.ID === selectedPharmacist);
    const pharmacistFullName = selectedPharmacistObj ? `${selectedPharmacistObj.FirstName} ${selectedPharmacistObj.LastName}` : '';

    // Construct data object
    const data = {
      user_id: userId, // Pass userId as integer
      pharmacist: pharmacistFullName,
      prescribedBy: prescribedBy,
      medicines: sanitizedMedicines,
      name: prescriptionName
    };

    try {
      const response = await fetch('https://example.com/api/createPrescription.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (response.ok) {
        setSuccessMessage('Prescription added successfully.');
        setErrorMessage('');
        // Clear form fields
        setSelectedPatient('');
        setSelectedPharmacist('');
        setMedicineList([]);
        setPrescriptionName('');
        setPrescribedBy('');
      } else {
        setErrorMessage(responseData);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error adding prescription:', error);
      setErrorMessage('Error: Failed to add prescription.');
      setSuccessMessage('');
    }
  };

  // Function to add a new medicine to the list
  const addMedicine = () => {
    setMedicineList([...medicineList, '']);
  };

  // Function to handle changes in medicine input
  const handleMedicineChange = (index, value) => {
    const updatedMedicines = [...medicineList];
    updatedMedicines[index] = value;
    setMedicineList(updatedMedicines);
  };

  return (
    <>
    <HealthcareProviderSidebar/>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Add Prescription</h2>
      {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="patient">Select Patient:</label>
          <select id="patient" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} style={{ marginLeft: '10px' }}>
            <option value="">Select</option>
            {patients.map(patient => (
              <option key={patient.ID} value={patient.ID}>{patient.FirstName} {patient.LastName}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="pharmacist">Select Pharmacist:</label>
          <select id="pharmacist" value={selectedPharmacist} onChange={(e) => setSelectedPharmacist(e.target.value)} style={{ marginLeft: '10px' }}>
            <option value="">Select</option>
            {pharmacists.map(pharmacist => (
              <option key={pharmacist.ID} value={pharmacist.ID}>{pharmacist.FirstName} {pharmacist.LastName}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="prescribedBy">Prescribed By:</label>
          <input type="text" id="prescribedBy" value={prescribedBy} onChange={(e) => setPrescribedBy(e.target.value)} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Enter Medicines:</label>
          {medicineList.map((medicine, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={medicine}
                onChange={(e) => handleMedicineChange(index, e.target.value)}
                style={{ marginRight: '10px' }}
              />
            </div>
          ))}
          <button type="button" onClick={addMedicine} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Add Medicine</button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="prescriptionName">Prescription Name:</label>
          <input type="text" id="prescriptionName" value={prescriptionName} onChange={(e) => setPrescriptionName(e.target.value)} style={{ marginLeft: '10px' }} />
        </div>
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Add Prescription</button>
      </form>
    </div>
    </>
  );
}

export default PrescriptionForm;
