import { Link } from 'react-router-dom';
import { Mail, Globe, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-area darker-section">
      <div className="container">
        <div className="footer-grid" style={{ paddingTop: '4rem' }}>
          <div className="footer-col brand-col">
            <Link to="/" className="brand footer-brand">
              <span className="brand-text">Bynergex Consulting</span>
            </Link>
            <p className="company-desc">
              Professional Electrical Engineering Consultancy<br/>
              Cape Town, Western Cape, South Africa
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Details</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={20} className="contact-icon" />
                <a href="mailto:consultant@bynergex.com">consultant@bynergex.com</a>
              </li>
              <li>
                <Globe size={20} className="contact-icon" />
                <a href="https://www.bynergex.com">www.bynergex.com</a>
              </li>
              <li>
                <ArrowRight size={20} className="contact-icon" />
                <a href="https://linkedin.com">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>ECSA Registered | Pr. Tech Eng</p>
          <div className="footer-bottom-links">
            <p>&copy; {new Date().getFullYear()} Bynergex Consulting (Pty) Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
