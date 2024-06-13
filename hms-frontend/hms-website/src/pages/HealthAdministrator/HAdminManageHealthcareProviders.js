import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import HealthAdministratorSidebar from '../../components/HealthAdministratorSidebar';

const ManageHealthcareProviders = () => {
  const [hcps, setHCPs] = useState([]);
  const [selectedHCP, setSelectedHCP] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHCPs();
  }, []);

  const fetchHCPs = async () => {
    try {
      const response = await fetch('https://example.com/api/gethcps.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setHCPs(data);
        setError(null); // Clear any previous errors
      } else {
        setError('Error fetching healthcare providers. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching hcps:', error);
      setError('Error fetching healthcare providers. Please try again later.');
    }
  };

  const handleToggleStatus = async (ID) => {
    try {
      const response = await fetch('https://example.com/api/gethcps.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: ID }),
      });

      if (response.ok) {
        fetchHCPs();
        console.log('Healthcare Provider account status toggled successfully');
        setError(null); // Clear any previous errors
      } else {
        setError('Error toggling healthcare provider account status. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error toggling healthcare provider account status. Please try again later.');
    }
  };

  const handleEdit = (hcp) => {
    setSelectedHCP(hcp);
  };

  const handleUpdate = async (updatedHCP) => {
    try {
      // Send POST request to update healthcare provider details
      const response = await fetch('https://example.com/api/updatehcp.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHCP),
      });

      if (response.ok) {
        fetchHCPs();
        setSelectedHCP(null); // Close edit mode
        console.log('Healthcare Provider details updated successfully');
        setError(null); // Clear any previous errors
      } else {
        setError('Error updating healthcare provider details. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error updating healthcare provider details. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedHCP((prevHCP) => ({
      ...prevHCP,
      [name]: value,
    }));
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <HealthAdministratorSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h2 style={{ color: '#007bff' }}>Manage Healthcare Providers</h2>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>User Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hcps.map((hcp, index) => (
                    <tr key={hcp.ID}>
                      <td>{index + 1}</td>
                      <td>{hcp.ID}</td>
                      <td>
                        {selectedHCP && selectedHCP.ID === hcp.ID ? (
                          <input
                            type="text"
                            name="FirstName"
                            value={selectedHCP.FirstName}
                            onChange={handleChange}
                          />
                        ) : (
                          hcp.FirstName
                        )}
                      </td>
                      <td>
                        {selectedHCP && selectedHCP.ID === hcp.ID ? (
                          <input
                            type="text"
                            name="LastName"
                            value={selectedHCP.LastName}
                            onChange={handleChange}
                          />
                        ) : (
                          hcp.LastName
                        )}
                      </td>
                      <td>
                        {selectedHCP && selectedHCP.ID === hcp.ID ? (
                          <input
                            type="text"
                            name="Email"
                            value={selectedHCP.Email}
                            onChange={handleChange}
                          />
                        ) : (
                          hcp.Email
                        )}
                      </td>
                      <td>
                        {selectedHCP && selectedHCP.ID === hcp.ID ? (
                          <input
                            type="text"
                            name="ContactNumber"
                            value={selectedHCP.ContactNumber}
                            onChange={handleChange}
                          />
                        ) : (
                          hcp.ContactNumber
                        )}
                      </td>
                      <td>{hcp.status}</td>
                      <td>
                        {selectedHCP && selectedHCP.ID === hcp.ID ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleUpdate(selectedHCP)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="btn btn-info"
                            onClick={() => handleEdit(hcp)}
                            disabled={hcp.status === 'notverified'}
                          >
                            <FaEdit />
                          </button>
                        )}
                        <button
                          className="btn btn-success"
                          onClick={() => handleToggleStatus(hcp.ID)}
                          disabled={hcp.status === 'verified'}
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleToggleStatus(hcp.ID)}
                          disabled={hcp.status === 'notverified'}
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

export default ManageHealthcareProviders;
