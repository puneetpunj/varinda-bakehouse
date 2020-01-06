import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';

import { FaAlignRight, FaFacebookSquare, FaPhoneSquare, FaWhatsappSquare, FaShoppingCart } from "react-icons/fa";
// import logo from "../images/logo.png";
// import logo from "../images/logo copy.svg";
export default class Navbar extends Component {
  state = {
    isOpen: false
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }
  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header" >
            <button
              type="button"
              className="nav-btn"
              onClick={this.handleToggle}
            >
              <FaAlignRight className="nav-icon" />
            </button>
            <div className={this.state.isOpen ? "no-show" : "contact-icons"}  >
              <a href="https://api.whatsapp.com/send?phone=+61451871800" className="nav-icon nav-wa" >
                <FaWhatsappSquare />
              </a>
              <a href='https://www.facebook.com/meltinmouthbyvarinda' target="_blank" rel="noopener noreferrer" className="nav-icon nav-fb">
                <FaFacebookSquare />
              </a>
              <a href="tel: +61 451 871 800" className="nav-icon nav-phone" >
                <FaPhoneSquare />
              </a>
            </div>
          </div>

          <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
            <li>
              <Link to="/" >Home</Link>
            </li>
            <li>
              <Link to="/contact" >Contact Us</Link>
            </li>
          </ul>
          <div>
            <Link to="/cart">
              <FaShoppingCart className="cart" />
            </Link>
          </div>

        </div>
      </nav >
    );
  }
}
