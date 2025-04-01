import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <section className="newletter">
        <div className="container flexSB">
          <div className="left row">
            <h1>Newsletter</h1>
            <span>SUBSCRIBE TO GET THE LATEST OFFERS</span>
          </div>
          <div className="right row">
            <input type="text" placeholder="Enter email address" />
            <i className="fa fa-paper-plane"></i>
          </div>
        </div>
      </section>
      <footer>
        <div className="container padding">
          <div className="box logo">
            <h1>INNOVATIVE EVENT PLANNER</h1>
            <span>Your Event, Your Way</span>
            <p>Find the best venue vendors</p>
          </div>
          <div className="box link">
            <h3>Explore</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/destinations">Destinations</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="box link">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/faqs">Faqs</Link>
              </li>
            </ul>
          </div>
          <div className="box last">
            <h3>Contact Details</h3>
            <ul>
              <li>
                <i className="fa fa-map"></i>
                Karawal Nagar, Delhi India
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                +91 70535 50233
              </li>
              <li>
                <i className="fa fa-paper-plane"></i>
                rahulkulshrestha011@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="legal">
        <p>Copyright ©2024 All rights reserved</p>
      </div>
    </>
  );
};

export default Footer;
