import React, { Fragment } from 'react';
import imageBanner from '../images/abt.jpg'
import Header from '../components/Header';

const About = () => {
  const containerStyle = {
    textAlign: 'start',
  };

  const fontColorStyle = {
    color: '#7b8898',
    face: 'Mercury SSm A, Mercury SSm B, Georgia, Times, Times New Roman, Microsoft YaHei New, Microsoft Yahei, ????, ??, SimSun, STXihei, ????, serif',
  };

  const spanStyle = {
    fontSize: '24px',
  };

  return (
    <Fragment>
      <Header/>
      <div className="banner banner5">
        <div className="container">
          <h2>About</h2>
        </div>
      </div>

      <div className="about">
        <div className="container">
          <div className="about-info-grids">
            <div className="col-md-5 abt-pic">
              <img src={imageBanner} className="img-responsive" alt="" />
            </div>
            <div className="col-md-7 abt-info-pic" style={containerStyle}>
              <p>
                <div style={containerStyle}>
                  <font style={fontColorStyle}>
                    <span style={spanStyle}>
                    A Patient Management System is a robust software solution tailored to optimize and simplify the management tasks within healthcare facilities. It facilitates the seamless handling of patient data, encompassing registration, medical history, appointments, treatments, and billing information, thereby ensuring efficient operations and improved patient care.
                    </span>
                  </font>
              </div>
              </p>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
