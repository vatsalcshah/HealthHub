import React, { Fragment, useState } from 'react';
import appLogo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Confirm password does not match');
      return;
    }

    // Retrieve email from sessionStorage
    const email = sessionStorage.getItem('email');
    console.log('Email:', email);

    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);
    data.append('cpassword', confirmPassword);

    try {
      const response = await fetch('https://example.com/api/password-change.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
        credentials: 'include',
        mode: 'cors',
      });

      const responseData = await response.json();
      if (responseData.status === 1) {
        sessionStorage.clear();
        // Password changed successfully
        // You can add a success message or redirect to a success page
        navigate('/Login');
      } else if (responseData.errors && responseData.errors.password) {
        setError(responseData.errors.password);
      } else {
        setError('Failed to change the password. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred during password change:', error);
      setError('Failed to change the password. Please try again.');
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
                  <h4>Change Password</h4>
                  <p>Enter your new password:</p>
                  <form className="pt-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        required={true}
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password"
                        required={true}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      {error && <div className="text-danger">{error}</div>}
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-success btn-block loginbtn" type="submit">
                        Change Password
                      </button>
                      <br />
                    </div>
                  </form>
                  <div className="mb-2">
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

export default ChangePassword;
