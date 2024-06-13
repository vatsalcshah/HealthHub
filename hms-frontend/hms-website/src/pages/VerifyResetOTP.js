import React, { Fragment, useState } from 'react';
import appLogo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const VerifyResetOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError('Invalid OTP. Please enter a 6-digit numeric code.');
    } else {
      // Send OTP to the server for verification
      try {
        const otpValue = parseInt(otp, 10);
        const formData = new FormData();
        formData.append('check', true);
        formData.append('otp', otpValue);
        const response = await fetch('https://example.com/api/reset-code.php', {
          method: 'POST',
          body: formData,
          credentials: 'include',
          mode: 'cors',
        });

        const data = await response.json();
        if (data.status === 1) {
          // OTP verification successful, navigate to success page
          navigate('/ResetPassword');
        } else {
          // Invalid OTP, set an error message
          setError('Invalid OTP. Please try again.');
        }
      } catch (error) {
        console.error('Error occurred during OTP verification:', error);
        setError('Failed to verify OTP. Please try again.');
      }
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
                  <h4>Code Verification</h4>
                  <p>We have sent the OTP to your Email. Please check and enter below:</p>
                  <form className="pt-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter OTP"
                        required={true}
                        value={otp}
                        onChange={handleOtpChange}
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

export default VerifyResetOTP;
