import React, { Fragment, useState } from 'react';
import appLogo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://example.com/api/resetpassword.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
        mode: 'cors',
      });

      const data = await response.json();
      if (data.status === 1) {
        sessionStorage.setItem('email', email);
        // Password reset email sent successfully
        // You can add a success message or redirect to a success page
        navigate('/VerifyResetOTP');
      } else if (data.errors && data.errors.email) {
        setError(data.errors.email);
      } else {
        setError('Failed to send the password reset email. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred during password reset:', error);
      setError('Failed to send the password reset email. Please try again.');
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
                  <h4>Forgot Password</h4>
                  <p>Enter your email address to reset your password:</p>
                  <form className="pt-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Email"
                        required={true}
                        value={email}
                        onChange={handleEmailChange}
                      />
                      {error && <div className="text-danger">{error}</div>}
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-success btn-block loginbtn" type="submit">
                        Submit
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

export default ForgotPassword;
