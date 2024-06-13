import React, { useState, useEffect } from 'react';
import PharmacistSidebar from '../../components/PharmacistSidebar';

export default function PharmacistProfile() {

  const [adminDetails, setAdminDetails] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    ID: '',
    ContactNumber: '',
  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        // Get UserID from session storage or wherever it's stored
        const UserID = sessionStorage.getItem('UserID');
  
        if (!UserID) {
          // Handle the case where UserID is not available
          console.error('UserID is not available.');
          return;
        }
  
        const response = await fetch(`https://example.com/api/adminprofile.php/${UserID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
  
        const data = await response.json();
        setAdminDetails(data[0]);
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

  fetchAdminDetails();
}, []);

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <PharmacistSidebar/>
        <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Pharmacist Profile</h3>
            </div>
            <div className="row">
              <div className="col-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered mg-b-0">
                        <thead className="table-warning">
                          <tr>
                            <th colSpan="2">Pharmacist Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-info">
                            <th>First Name</th>
                            <td>{adminDetails.FirstName || 'Loading...'}</td>
                          </tr>
                          <tr className="table-warning">
                            <th>Last Name</th>
                            <td>{adminDetails.LastName || 'Loading...'}</td>
                          </tr>
                          <tr className="table-danger">
                            <th>Email ID</th>
                            <td>{adminDetails.Email || 'Loading...'}</td>
                          </tr>
                          <tr className="table-success">
                            <th>User ID</th>
                            <td>{adminDetails.ID || 'Loading...'}</td>
                          </tr>
                          <tr className="table-primary">
                            <th>Contact Number</th>
                            <td>{adminDetails.ContactNumber || 'Loading...'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
  )
}