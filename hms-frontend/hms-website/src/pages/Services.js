import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Header from '../components/Header';
import ComprehensiveCareImage from '../images/comprehensiveCare.jpg';
import AdvancedTreatmentsImage from '../images/advancedTreatments.jpg';
import AccessibilityImage from '../images/accessibility.jpg';
import MentalHealthSupportImage from '../images/serviceImage1.jpg';
import WellnessPreventionImage from '../images/serviceImage2.jpg';
import ResearchInnovationImage from '../images/serviceImage3.png';

const Services = () => {
  const [facilities, setFacilities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch('https://example.com/api/facilities.php', {
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
        setFacilities(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      }
    };

    fetchFacilities();
  }, []);

  const containerStyle = {
    textAlign: 'center',
    color: '#333',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    margin: '20px auto',
    maxWidth: '800px',
  };

  const headerStyle = {
    color: '#2793FD',
  };

  return (
    <div style={containerStyle}>
      <Header />
      <br />
      <br />
      <h1>Our Services</h1>
      <br />
      <div style={cardStyle}>
        <Carousel>
          <div>
            <img src={ComprehensiveCareImage} alt='Comprehensive Care' />
            <p className="legend">Comprehensive Care</p>
          </div>
          <div>
            <img src={AdvancedTreatmentsImage} alt='Advanced Treatments' />
            <p className="legend">Advanced Treatments</p>
          </div>
          <div>
            <img src={AccessibilityImage} alt='Accessibility for All' />
            <p className="legend">Accessibility for All</p>
          </div>
          <div>
            <img src={MentalHealthSupportImage} alt='Mental Health Support' />
            <p className="legend">Mental Health Support</p>
          </div>
          <div>
            <img src={WellnessPreventionImage} alt='Wellness and Prevention' />
            <p className="legend">Wellness and Prevention</p>
          </div>
          <div>
            <img src={ResearchInnovationImage} alt='Research and Innovation' />
            <p className="legend">Research and Innovation</p>
          </div>
        </Carousel>

        {loading ? (
          <p>Loading facilities data...</p>
        ) : (
          <>
            <h2 style={headerStyle}>Facilities Information</h2>
            <div className="row">
              <div className="col-md-6 col-xl report-inner-card">
                <div className="inner-card-text">
                  <span className="report-title">Total ICU Beds</span>
                  <h4>{facilities.ICU_Beds || 'Not Available'}</h4>
                </div>
                <div className="inner-card-icon bg-primary">
                  <i className="icon-doc"></i>
                </div>
              </div>
              <div className="col-md-6 col-xl report-inner-card">
                <div className="inner-card-text">
                  <span className="report-title">Total Normal Rooms</span>
                  <h4>{facilities.Normal_Rooms || 'Not Available'}</h4>
                </div>
                <div className="inner-card-icon bg-danger">
                  <i className="icon-user"></i>
                </div>
              </div>
              <div className="col-md-6 col-xl report-inner-card">
                <div className="inner-card-text">
                  <span className="report-title">Total Ambulances</span>
                  <h4>{facilities.Ambulances || 'Not Available'}</h4>
                </div>
                <div className="inner-card-icon bg-success">
                  <i className="icon-rocket"></i>
                </div>
              </div>
              <div className="col-md-6 col-xl report-inner-card">
                <div className="inner-card-text">
                  <span className="report-title">Total X-Ray Rooms</span>
                  <h4>{facilities.XRay_Rooms || 'Not Available'}</h4>
                </div>
                <div className="inner-card-icon bg-warning">
                  <i className="icon-doc"></i>
                </div>
              </div>
            </div>

            <h2 >Comprehensive Care</h2>
            <p>Our hospital offers a wide range of medical services to ensure comprehensive care for all patients.</p>

            <h2 >Advanced Treatments</h2>
            <p>We utilize cutting-edge technology and treatments to provide the best possible outcomes for our patients.</p>

            <h2 >Accessibility for All</h2>
            <p>Ensuring healthcare is accessible to everyone, our facilities are equipped to accommodate patients of all needs.</p>

            <h2 >Mental Health Support</h2>
            <p>Our dedicated mental health professionals offer compassionate care and comprehensive treatment options.</p>

            <h2 >Wellness and Prevention</h2>
            <p>Focusing on prevention and wellness, we offer programs and resources to help patients maintain a healthy lifestyle.</p>

            <h2 >Research and Innovation</h2>
            <p>At the forefront of medical research, we are committed to innovation and improving healthcare outcomes.</p>
          </>
        )}
      </div>
      <br />
      <br />
    </div>
  );
}

export default Services;
