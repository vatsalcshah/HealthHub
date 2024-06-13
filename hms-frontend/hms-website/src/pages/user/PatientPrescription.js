import React, { useState, useEffect } from 'react';
import PatientSidebar from '../../components/PatientSidebar';

const PrescriptionPage = () => {
  // State to store prescriptions data and selected prescription
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Function to retrieve the current user ID from session storage
  const getCurrentUserId = () => {
    const storedUserId = sessionStorage.getItem('UserID');
    if (storedUserId) {
      return parseInt(storedUserId);
    } else {
      alert('UserID is not available.');
      sessionStorage.clear();
      return null;
    }
  };

  // Fetch prescriptions data from PHP endpoint based on the current user ID
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        // Get current user ID from session storage
        const userId = getCurrentUserId();
        if (!userId) {
          return; // Return if user ID is not available
        }

        // Fetch data from PHP endpoint with the user ID as a query parameter
        const response = await fetch(`https://example.com/api/fetchPrescriptions.php?userID=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch prescriptions data');
        }
        const data = await response.json();

        // Parse medicines from JSON string to array
        const prescriptionsWithParsedMedicines = data.map(prescription => ({
          ...prescription,
          medicines: JSON.parse(prescription.medicines)
        }));

        setPrescriptions(prescriptionsWithParsedMedicines);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };
    fetchPrescriptions();
  }, []);

  return (
    <>
      <PatientSidebar/>
      <div style={{ display: 'flex', backgroundColor: '#007bff', color: '#fff', minHeight: '100vh' }}>
        {/* Left side with list of prescriptions */}
        <div style={{ width: '30%', padding: '20px' }}>
          <h2>💊 Prescriptions</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {prescriptions.length > 0 ? (
              prescriptions.map(prescription => (
                <li key={prescription.prescription_id} style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => setSelectedPrescription(prescription)}>
                  {prescription.name}
                </li>
              ))
            ) : (
              <p>No Prescriptions</p>
            )}
          </ul>
        </div>
        <div style={{ width: '70%', padding: '20px', background:'#ffff', borderColor:'#000', borderStyle:'solid'}}>
          {selectedPrescription ? (
            <div>
              <h2 style={{color:'#000'}}>{selectedPrescription.name}</h2>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{color:'#000'}}>Medicines</h3>
                <ul style={{color:'#000', listStyleType: 'numbered', padding: 0 , marginLeft:'20px'}}>
                  {Array.isArray(selectedPrescription.medicines) ? (
                    selectedPrescription.medicines.map((medicine, index) => (
                      <li key={index}>{medicine}</li>
                    ))
                  ) : (
                    <li>{selectedPrescription.medicines}</li>
                  )}
                </ul>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p style={{color:'#000'}}>Prescribed By: {selectedPrescription.prescribedBy}</p>
              </div>
              <div>
                <p style={{color:'#000'}}>Pharmacist: {selectedPrescription.pharmacist}</p>
              </div>
            </div>
          ) : (
            <p style={{ fontStyle: 'italic', color: '#000' }}>Please Select Prescription</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PrescriptionPage;
