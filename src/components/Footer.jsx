// Footer.jsx

import React from 'react';
import './Footer.css'; // Your custom CSS file for styling
import { FaTelegram, FaInstagram, 
  // FaFacebookF,  FaTwitter 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p><strong>Managed by: </strong> Romil janagal</p>
          <p><strong>Email: </strong> Romilkirmara7777@gmail.com</p>
        </div>

        {/* <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div> */}

        <div className="footer-section">
          <h2>Follow Us</h2>
          <p>Connect with us on social media:</p>
          <div className="social-icons">
            {/* <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </Link> */}
            {/* <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </Link> */}
            <Link to="https://instagram.com/romiilll" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </Link>
            <Link to="https://t.me/romiilll" target="_blank" rel="noopener noreferrer">
            <FaTelegram />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} moviereviewpoint.com All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
