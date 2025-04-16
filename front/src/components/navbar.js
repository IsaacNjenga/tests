import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand"></div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Google Maps</Link>
        </li>
        <li>
          <Link to="/customization">Customization</Link>
        </li>
        <li>
          <Link to="/event-locator">Event Locator</Link>
        </li>
        <li>
          <Link to="/field-services">Field Services</Link>
        </li>
        <li>
          <Link to="/real-estate">Real Estate</Link>
        </li>
        <li>
          <Link to="/real-time-position">Real Time Position Tracking</Link>
        </li>
        <li>
          <Link to="/reverse-geocode">Reverse Geocode</Link>
        </li>
        <li>
          <Link to="/mpesa">M-pesa</Link>
        </li>
        <li>
          <Link to="/stripe">Stripe</Link>
        </li>
        <li>
          <Link to="/cloudinary">Cloudinary</Link>
        </li>
        <li>
          <Link to="/paystack">Paystack</Link>
        </li>
        <li>
          <Link to="/pesapal">Pesapal</Link>
        </li>
        <li>
          <Link to="/currency">Currency</Link>
        </li>
        <li>
          <Link to="/email">Email</Link>
        </li>
        <li>
          <Link to="/intasend">Intasend</Link>
        </li>
        <li>
          <Link to="/dpo">DPO PAY</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
