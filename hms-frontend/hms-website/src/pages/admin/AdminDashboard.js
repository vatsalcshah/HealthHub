import React, { Fragment, useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://example.com/api/admindash.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    return (
        <Fragment>
    <div className="container-fluid page-body-wrapper">
      <AdminSidebar/>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-sm-flex align-items-baseline report-summary-header">
                          <h5 className="font-weight-semibold">Admin Dashboard</h5> <span className="ml-auto">Updated Information</span> <button className="btn btn-icons border-0 p-2"><i className="icon-refresh"></i></button>
                        </div>
                      </div>
                    </div>
                    <div className="row report-inner-cards-wrapper">
                      <div className=" col-md -6 col-xl report-inner-card">
                        <div className="inner-card-text">

                          <span className="report-title">Total Health Adminstrators</span>
                          <h4>{response.TotalHealthAdminstratorCount || 'Loading...'}</h4>
                        </div>
                        <div className="inner-card-icon bg-success">
                          <i className="icon-rocket"></i>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl report-inner-card">
                        <div className="inner-card-text">
                          <span className="report-title">Total Patients</span>
                          <h4>{response.TotalPatientCount || 'Loading...'}</h4>
                        </div>
                        <div className="inner-card-icon bg-danger">
                          <i className="icon-user"></i>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl report-inner-card">
                        <div className="inner-card-text">
                          <span className="report-title">Total Pharmacists</span>
                          <h4>{response.TotalPharmacistCount || 'Loading...'}</h4>
                        </div>
                        <div className="inner-card-icon bg-warning">
                          <i className="icon-doc"></i>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl report-inner-card">
                        <div className="inner-card-text">
                          <span className="report-title">Total Healthcare Providers</span>
                          <h4>{response.TotalHealthcareProviderCount || 'Loading...'}</h4>
                        </div>
                        <div className="inner-card-icon bg-primary">
                          <i className="icon-doc"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
        </div>
        </Fragment>
    );
};

export default AdminDashboard;
