import React, { useState, useEffect } from 'react';
import { FaUser, FaServer } from 'react-icons/fa';
import AdminSidebar from '../../components/AdminSidebar';

function DataOversight() {
  const [userCounts, setUserCounts] = useState({
    Admin: { not_verified_count: 0, verified_count: 0 },
    Patient: { not_verified_count: 0, verified_count: 0 },
    HealthcareProvider: { not_verified_count: 0, verified_count: 0 },
    Pharmacist: { not_verified_count: 0, verified_count: 0 },
    HealthAdministrator: { not_verified_count: 0, verified_count: 0 },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://example.com/api/getverified.php');
      const data = await response.json();
      setUserCounts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderUserBox = (userType, count, verified) => {
    return (
      <div className={`user-box ${verified ? 'verified' : 'not-verified'}`} key={userType}>
        <div className="user-type">{userType}</div>
        <div className="user-count">{`No. of ${verified ? 'Verified' : 'Not Verified'} Users: ${count}`}</div>
        <FaUser className="user-icon" />
      </div>
    );
  };

  return (
    <>
    <AdminSidebar/>    
    <div className="data-oversight">
      <h2 style={{ color: '#007bff' }}>Data Oversight</h2>
      <div className="server-status-container">
        <h2>Server Status</h2>
        <div className="server-box">
  <div className="status-info">
    <span>Domain: https://example.com/</span>
    <FaServer className="server-icon online" />
    <span>Status: ONLINE</span>
  </div>
</div>
<div className="server-box">
  <div className="status-info">
    <span>Domain: https://example.com/</span>
    <FaServer className="server-icon online" />
    <span>Status: ONLINE</span>
  </div>
</div>
      </div>

      <div className="user-counts-container">
        <div className="verified-users">
          <h2>Verified Users</h2>
          {Object.entries(userCounts).map(([userType, { verified_count }]) =>
            renderUserBox(userType, verified_count, true)
          )}
        </div>
        <div className="not-verified-users">
          <h2>Not Verified Users</h2>
          {Object.entries(userCounts).map(([userType, { not_verified_count }]) =>
            renderUserBox(userType, not_verified_count, false)
          )}
        </div>
      </div>

      <style jsx>{`
        .data-oversight {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .server-status-container {
          text-align: center;
          margin-bottom: 50px;
        }

        .server-box {
          display: inline-block;
          padding: 10px;
          margin: 10px;
          border-radius: 5px;
          background-color: #f0f0f0;
          border: 2px solid #007bff;
        }

        .server-icon {
          font-size: 20px;
          margin-right: 10px;
        }

        .online {
          color: #007bff;
        }

        .user-counts-container {
          display: flex;
          justify-content: space-between;
        }

        .verified-users,
        .not-verified-users {
          flex: 1;
          margin-right: 20px;
        }

        .user-box {
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
        }

        .verified {
          background-color: #d4edda;
          border-color: #c3e6cb;
        }

        .not-verified {
          background-color: #f8d7da;
          border-color: #f5c6cb;
        }

        .user-type {
          font-weight: bold;
        }

        .user-count {
          margin-top: 5px;
        }

        .user-icon {
          margin-top: 5px;
          font-size: 20px;
        }

        .status-info {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .status-info span {
            display: block;
            margin-bottom: 5px;
          }
          
      `}</style>
    </div>
    </>
  );
}

export default DataOversight;
