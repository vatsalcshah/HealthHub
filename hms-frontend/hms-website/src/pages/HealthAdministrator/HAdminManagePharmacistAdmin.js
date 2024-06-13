import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import HealthAdministratorSidebar from '../../components/HealthAdministratorSidebar';

const ManagePharmacistAdmin = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPharmacists();
  }, []);

  const fetchPharmacists = async () => {
    try {
      const response = await fetch('https://example.com/api/getpharmacists.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPharmacists(data);
        setError(null); // Clear any previous errors
      } else {
        setError('Error fetching pharmacists. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching pharmacists:', error);
      setError('Error fetching pharmacists. Please try again later.');
    }
  };

  const handleToggleStatus = async (ID) => {
    try {
      const response = await fetch('https://example.com/api/getpharmacists.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: ID }),
      });

      if (response.ok) {
        fetchPharmacists();
        console.log('Pharmacist account status toggled successfully');
        setError(null); // Clear any previous errors
      } else {
        setError('Error toggling pharmacist account status. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error toggling pharmacist account status. Please try again later.');
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <HealthAdministratorSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h2 style={{ color: '#007bff' }}>Manage Pharmacists</h2>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Pharmacist User Id</th>
                    <th>Pharmacist Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pharmacists.map((pharmacist, index) => (
                    <tr key={pharmacist.ID}>
                      <td>{index + 1}</td>
                      <td>{pharmacist.ID}</td>
                      <td>{pharmacist.FirstName} {pharmacist.LastName}</td>
                      <td>{pharmacist.status}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleToggleStatus(pharmacist.ID)}
                          disabled={pharmacist.status === 'verified'}
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleToggleStatus(pharmacist.ID)}
                          disabled={pharmacist.status === 'notverified'}
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePharmacistAdmin;
