import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import LogoWhite from '../../images/logo.png'

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={ LogoWhite } alt="Logo" />
          </Link>
          <span className="navbar-burger burger" data-target="navbar">
            <span/>
            <span/>
            <span />
          </span>
        </div>
        <div id="navbar" className="navbar-menu">
          <div className="navbar-end">
            <SignedInLinks />
            <SignedOutLinks />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;