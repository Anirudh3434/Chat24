import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h4>Projects</h4>
        <ul>
        <li><a href="https://24space.netlify.app">Space.24</a></li> 
          <li><a href="https://24portfolio.netlify.app">Portfolio</a></li>
          <li><a href="https://24weather.netlify.app">Weather.24</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Email: anigokala3@gmail.com</p>
        <p>Phone: +91 9812455974</p>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <p>Facebook | Twitter | Instagram</p>
      </div>
    </footer>
  );
};

export default Footer;
