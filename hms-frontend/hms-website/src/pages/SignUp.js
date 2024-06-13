import React, { Fragment, useState } from 'react';
import appLogo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SignUp = () => {
  const linkStyle = { listStyleType: 'none' };
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    emailid: '',
    userId: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });
  const [formErrors, setFormErrors] = useState({
    firstname: false,
    lastname: false,
    emailid: false,
    userId: false,
    phone: false,
    password: false,
    confirmPassword: false,
    userType: false
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'userId') {
      let errors = {};
  
      if (!/^\d+$/.test(value) || value.includes('+') || value.length > 10) {
        errors = { ...errors, [name]: true };
      } else {
        errors = { ...errors, [name]: false };
        setFormData({ ...formData, [name]: value });
      }
  
      setFormErrors({ ...formErrors, ...errors });
    } else if (name === 'phone') {
      let errors = {};
  
      if (!/^\d+$/.test(value) || value.length > 10) {
        errors = { ...errors, [name]: true };
      } else {
        errors = { ...errors, [name]: false };
        setFormData({ ...formData, [name]: value });
      }
  
      setFormErrors({ ...formErrors, ...errors });
    } else {
      setFormData({ ...formData, [name]: value });
      setFormErrors({ ...formErrors, [name]: false });
    }
  };
  

  const handleSignUp = async (e) => {
    e.preventDefault();

  // Show loading state by setting a state variable
  setFormLoading(true);

  // Disable input fields
  setFormDisabled(true);

    let errors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(formData.emailid.trim())) {
      errors = { ...errors, emailid: true };
      isValid = false;
    }

    if (!phoneRegex.test(formData.phone.trim())) {
      errors = { ...errors, phone: true };
      isValid = false;
    }

    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      errors = { ...errors, password: true, confirmPassword: true };
      isValid = false;
    }

    if (formData.emailid.trim() === '') {
      errors = { ...errors, emailid: true };
      isValid = false;
    }

    if (formData.password.trim() === '') {
      errors = { ...errors, password: true };
      isValid = false;
    }

    if (formData.userId.trim() === '') {
      errors = { ...errors, userId: true };
      isValid = false;
    }

    if (formData.userType.trim() === '') {
      errors = { ...errors, userType: true };
      isValid = false;
    }

    setFormErrors(errors);

    if (isValid) {
      try {
        const response = await fetch('https://example.com/api/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
          mode: 'cors',
        });

        const data = await response.json();
        if (data.status === 1) {
          navigate('/VerifyOTP');
        } else if (data.status === 0 && data.message === 'Email or ID already exists') {
          alert('Sign up failed: Email or ID already exists');
        } else {
          console.error('Sign up failed');
        }
      } catch (error) {
        console.error('Error occurred during sign up:', error);
      }  finally
      {
        // Hide loading state and enable input fields after API response
        setFormLoading(false);
        setFormDisabled(false);
      }
    }
    else {
      // Hide loading state and enable input fields if validation fails
      setFormLoading(false);
      setFormDisabled(false);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <div className="brand-logo">
                    <img src={appLogo} alt="Logo" />
                  </div>
                  <h4>Hello! Let's get started</h4>
                  <h6 className="font-weight-light">Sign up to continue.</h6>
                  <form className="pt-3" id="login" method="post" name="login" onSubmit={handleSignUp}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your Firstname"
                        required={true}
                        name="firstname"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your Lastname"
                        required={true}
                        name="lastname"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your E-mail ID"
                        required={true}
                        name="emailid"
                        onChange={handleInputChange}
                      />
                      {formErrors.emailid && <div className="text-danger">Email ID is required</div>}
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Enter Numeric User ID"
                        required={true}
                        name="userId"
                        onChange={handleInputChange}
                      />
                          {formErrors.userId && (
                            <div>
                              {formErrors.userId && /^\d+$/.test(formData.userId) && (
                                <div className="text-danger">Plus sign (+) is not allowed</div>
                              )}
                              {formErrors.userId && !/^\d+$/.test(formData.userId) && (
                                <div className="text-danger">User ID must contain only numbers</div>
                              )}
                              {formErrors.userId && formData.phone.length > 10 && (
                                <div className="text-danger">Numeric User ID cannot exceed 10 digits</div>
                              )}
                              {formErrors.userId && (
                                <div className="text-danger">Numeric User ID is required</div>
                              )}
                            </div>
                          )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your Phone"
                        required={true}
                        name="phone"
                        onChange={handleInputChange}
                      />
                        {formErrors.phone && (
                          <div>
                            {formErrors.phone && !/^\d+$/.test(formData.phone) && (
                              <div className="text-danger">Phone must contain only numbers</div>
                            )}
                            {formErrors.phone && formData.phone.length > 10 && (
                              <div className="text-danger">Phone number cannot exceed 10 digits</div>
                            )}
                            {formErrors.phone && (
                              <div className="text-danger">Phone is required</div>
                            )}
                          </div>
                        )}                  </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        name="password"
                        required={true}
                        onChange={handleInputChange}
                      />
                      {formErrors.password && <div className="text-danger">Password is required</div>}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Confirm your password"
                        name="confirmPassword"
                        required={true}
                        onChange={handleInputChange}
                      />
                      {formErrors.confirmPassword && <div className="text-danger">Confirm Password is required</div>}
                    </div>
                    <div className="form-group">
                      <select
                        className="form-control"
                        name="userType"
                        onChange={handleInputChange}
                        value={formData.userType}
                      >
                        <option value="">Select user type</option>
                        <option value="Admin">Admin</option>
                        <option value="Patient">Patient</option>
                        <option value="HealthcareProvider">Healthcare Provider</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="HealthAdminstrator">Health Adminstrator</option>
                      </select>
                      {formErrors.userType && <div className="text-danger">User type is required</div>}
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-success btn-block loginbtn" name="login" type="submit" disabled={formDisabled}>
                      {formLoading ? 'Signing Up...' : 'Signup'}
                      </button>
                      <br />
                    </div>
                  </form>
                  <div className="mb-2" style={linkStyle}>
                    <Link to="/" className="btn btn-block btn-facebook auth-form-btn">
                      Back Home
                    </Link>
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

export default SignUp;
