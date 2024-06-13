import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import AdminSidebar from '../../components/AdminSidebar';

const ManageHealthAdmins = () => {
  const [has, setHealthAdmins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHealthAdmins();
  }, []);

  const fetchHealthAdmins = async () => {
    try {
      const response = await fetch('https://example.com/api/gethas.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setHealthAdmins(data);
        setError(null); // Clear any previous errors
      } else {
        setError('Error fetching health admins. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching has:', error);
      setError('Error fetching health admins. Please try again later.');
    }
  };

  const handleToggleStatus = async (ID) => {
    try {
      const response = await fetch('https://example.com/api/gethas.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: ID }),
      });

      if (response.ok) {
        fetchHealthAdmins();
        console.log('Health Admin account status toggled successfully');
        setError(null); // Clear any previous errors
      } else {
        setError('Error toggling health admin account status. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error toggling health admin account status. Please try again later.');
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <AdminSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h2 style={{ color: '#007bff' }}>Manage Health Admins</h2>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Health Admin User Id</th>
                    <th>Health Admin Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {has.map((ha, index) => (
                    <tr key={ha.ID}>
                      <td>{index + 1}</td>
                      <td>{ha.ID}</td>
                      <td>{ha.FirstName} {ha.LastName}</td>
                      <td>{ha.status}</td>
                      <td>
                        <button className="btn btn-success" 
                        onClick={() => handleToggleStatus(ha.ID)}
                         disabled={ha.status === 'verified'}
                        >
                          <FaCheck />
                        </button>
                        <button className="btn btn-danger" onClick={() => handleToggleStatus(ha.ID)}
                        disabled={ha.status === 'notverified'}>
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

export default ManageHealthAdmins;
