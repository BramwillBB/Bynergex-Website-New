import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-area darker-section">
      <div className="container">
        <div className="newsletter-box">
          <div className="newsletter-content">
            <h3>Stay connected</h3>
            <p>Join our newsletter for industry updates, project highlights, and insights—only the good stuff.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>

        <div className="footer-grid">
          <div className="footer-col brand-col">
            <Link to="/" className="brand footer-brand">
              <Zap className="brand-icon" size={28} />
              <span className="brand-text">Bynergex<span className="brand-accent">.</span></span>
            </Link>
            <p className="company-desc">
              Premium electrical engineering consultancy providing specialized services in renewable energy, critical infrastructure, and compliance.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Main Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Renewable Energy & Solar PV</Link></li>
              <li><Link to="/services">Building Services</Link></li>
              <li><Link to="/services">Standby Power & UPS</Link></li>
              <li><Link to="/services">BESS Consulting</Link></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={20} className="contact-icon" />
                <span>Western Cape, South Africa</span>
              </li>
              <li>
                <Phone size={20} className="contact-icon" />
                <a href="tel:+27000000000">+27 (0) 00 000 0000</a>
              </li>
              <li>
                <Mail size={20} className="contact-icon" />
                <a href="mailto:info@bynergex.co.za">info@bynergex.co.za</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Bynergex Consulting. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
