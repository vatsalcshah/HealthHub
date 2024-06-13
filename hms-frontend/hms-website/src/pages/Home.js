import React from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Header from '../components/Header';


export default function Home() {
  return (
    <div>
     <Header/>
      <div className="banner">
        <div className="container">
          <div className="slider">
            <div className="callbacks_container">
              <ul className="rslides" id="slider">
                <li>
                  <h3>Patient Management System</h3>
                  <p>Registered Users can Login Here</p>
                  <div className="readmore">
                  <CustomLink to="/Login" >Login</CustomLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="welcome">
        <div className="container">
          <h2>Your Health Our Priority</h2>
          <p>
          Discover HealthHub Hospital's comprehensive healthcare services, where patient care comes first.
With our state-of-the-art facilities and dedicated healthcare professionals,
we are committed to providing you with exceptional medical care and support.
          </p>
        </div>
      </div>

      <div className="testimonials">
        <div className="container">
          <div className="testimonial-nfo">
            <h3 style={{color: '#fff'}}>HealthHub Hospital's Commitment to Patient-Centric Excellence</h3>
            <div className="scrolling-text" style={{ height: '350px', overflowY: 'scroll' }}>
              <p style={{ color: '#fff' }}>
              Embark on a journey of exceptional healthcare at HealthHub Hospital, where patient well-being takes center stage. Experience a blend of cutting-edge facilities and compassionate healthcare experts dedicated to your holistic wellness. Our unwavering commitment extends beyond treatment, ensuring personalized care and unwavering support throughout your medical journey. Trust in HealthHub Hospital for unparalleled medical excellence and a patient-centric approach that prioritizes your health and comfort above all else.</p>
              <hr />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
