import React, { useState } from "react";
import "./navbar.css";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <div>
      <header>
        <div className="nav-wrapper">
          <div className="logo-container">
            {/* <img
              className="logo"
              src={require("../game/img/game chef - 5.png")}
              alt="Logo"
            /> */}
            <img className="logo"src="assets/images/game chef bg - 4.png" alt="Logo" />
            

          </div>
          <nav>
            {/* <input className="hidden" type="checkbox" />
                <label className="menu-btn" for="menuToggle">
                    <div className="menu"></div>
                    <div className="menu"></div>
                    <div className="menu"></div>
                </label> */}
            <ul className="menu-btn hidden">
              <li>
                <button onClick={toggleModal} className="nav_button btn-modal">
                  <a href="#"> ₹ 00.00</a>
                </button>
              </li>
              <li>
                <Link to="/scanQR">
                  <button>
                    <a href="#">
                      <i className="fa-solid fa-qrcode"/> Scan QR
                    </a>
                  </button>
                </Link>
              </li>
            </ul>
            <div className="nav-container">
              <ul className="nav-tabs">
                {/* <li className="nav-tab">Home</li>
                        <li className="nav-tab">Products</li>
                        <li className="nav-tab">Services</li>
                        <li className="nav-tab">FAQ</li> */}
                <li className="nav-tab">
                  <button  className="nav_button btn-modal">
                    <a href="#"> ₹ 00.00</a>
                  </button>
                </li>
                <li className="nav-tab">
                  <Link to="/scanQR">
                    <button className="nav_button">
                      <a href="#">
                        <i className="fa-solid fa-qrcode"/> Scan QR
                      </a>
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      
    </div>
  );
};

export default Navbar;
