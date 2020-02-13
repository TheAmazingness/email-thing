import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import LogoWhite from '../../images/logo.png';
import LogoBlue from '../../images/logo-blue.png';

const Navbar = ({ location, overrideLocationHiding }) => {
  if (location.pathname === '/' && !overrideLocationHiding) {
    return null;
  }
  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={ location.pathname === '/' ? LogoWhite : LogoBlue } alt="Logo" />
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
            <SignedOutLinks home={ location.pathname === '/' } />
          </div>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Navbar);