import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import imageBanner from '../images/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

const LogoWithLink = () => {
  const logoStyles = {
    width: '160px',
    height: 'auto',
    float: 'left',
    padding: '10px 10px',
  };

  return (
    <CustomLink to="/">
      <img src={imageBanner} alt="Logo" style={logoStyles} className="main navbar-brand" />
    </CustomLink>
  );
};

function Header() {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu open/close

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const linkStyle = {
    listStyleType: 'none',
  };

  const toggleMenu = () => {
    setShowMediaIcons(!showMediaIcons);
    setMenuOpen(!menuOpen); // Toggle menu open/close
  };

  const navMenuStyle = {
    display: windowWidth <= 1080 ? (showMediaIcons ? 'block' : 'none') : 'block',
    textAlign: windowWidth <= 1080,
  };

  const hamburgerMenuStyle = {
    display: windowWidth <= 1080 ? 'block' : 'none',
    float: 'right',
    padding: '10px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '24px',
  };

  const navItemsStyle = {
    listStyleType: 'none',
    display: windowWidth <= 1080 ? 'grid' : 'inline',
    textAlign: windowWidth <= 1080 ? 'left' : 'inherit',
    marginTop: windowWidth <= 1080 ? '70px' : '0',
    marginRight: windowWidth <= 1080 ? '160px' : '0',
    marginBottom: windowWidth <= 1080 ? '10px' : '0',
    marginLeft: windowWidth <= 1080 ? '20px' : '0',
  };

  return (
    <div className="mainHeader" id="home">
      <nav className="main navbar navbar-default">
        <div className="main container" />
        <div className="main navbar-header" style={linkStyle}>
          <LogoWithLink />
        </div>
        <div className={`main collapse navbar-collapse`} id="bsexamplenavbarcollapse1" style={navMenuStyle}>
          <ul className="main nav navbar-nav margin-top cl-effect-2" style={navItemsStyle}>
            <li>
              <CustomLink to="/" className="custom-link">
                Home
              </CustomLink>
            </li>
            <li>
              <CustomLink to="/About" className="custom-link">
                About
              </CustomLink>
            </li>
            <li>
              <CustomLink to="/Contact" className="custom-link">
                Contact
              </CustomLink>
            </li>
            <li>
              <CustomLink to="/Services" className="custom-link">
                Services
              </CustomLink>
            </li>
            <li>
              <CustomLink to="/Login" className="custom-link">
                Login
              </CustomLink>
            </li>
            <li>
              <CustomLink to="/SignUp" className="custom-link">
                Signup
              </CustomLink>
            </li>
            <li>
              <CustomLink to="https://www.health.harvard.edu/blog" className="custom-link" external>
                Blog
              </CustomLink>
            </li>
          </ul>
        </div>
        <div className="hamburger-menu" style={hamburgerMenuStyle} onClick={toggleMenu}>
          {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>
      </nav>
      <div className="clearfix"> </div>
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Header;
