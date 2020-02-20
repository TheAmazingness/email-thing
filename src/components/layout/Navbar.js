import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import LogoWhite from '../../images/logo.png';
import LogoBlue from '../../images/logo-blue.png';
import { connect } from 'react-redux';

const Navbar = ({ location, overrideLocationHiding, accessToken, id }) => {
  if (location.pathname === '/' && !overrideLocationHiding) {
    return null;
  }
  const links = accessToken || id ? <SignedInLinks /> : <SignedOutLinks home={ location.pathname === '/' } />;
  const home = accessToken || id ? id ? '/inbox' : '/inbox/google' : '/';
  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to={ home }>
            <img src={ location.pathname === '/' ? LogoWhite : LogoBlue } alt="Logo" />
          </Link>
          <span className="navbar-burger burger" data-target="navbar">
            <span/>
            <span/>
            <span />
          </span>
        </div>
        <div id="navbar" className="navbar-menu">
          <div className="navbar-end">{ links }</div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProp = state => ({
  accessToken: state.auth.accessToken,
  id: state.auth.id
});

export default connect(mapStateToProp)(withRouter(Navbar));