import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import LogoWhite from '../../images/logo.png';
import LogoBlue from '../../images/logo-blue.png';
import { getAuth } from '../../store/actions/authActions';
import { connect } from 'react-redux';

const Navbar = ({ location, overrideLocationHiding, getAuth, auth }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getAuth(); }, []);

  const [state, setState] = useState({ active: '' });

  const handleClick = () => {
    if (state.active === 'is-active') {
      setState({ ...state, active: '' });
    } else {
      setState({ ...state, active: 'is-active' });
    }
  };

  const links = auth ? <SignedInLinks /> : <SignedOutLinks home={ location.pathname === '/' } />;
  const home = auth ? '/inbox' : '/';

  if (location.pathname === '/' && !overrideLocationHiding) {
    return null;
  }

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to={ home }>
            <img src={ location.pathname === '/' ? LogoWhite : LogoBlue } alt="Logo" />
          </Link>
          <span className={ `navbar-burger burger is-white ${ state.active }` } data-target="navbar" onClick={ handleClick }>
            <span />
            <span />
            <span />
          </span>
        </div>
        <div id="navbar" className={ `navbar-menu ${ state.active }` }>
          <div className="navbar-end">{ links }</div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  auth: state.auth.auth
});

const mapDispatchToProps = dispatch => ({
  getAuth: () => dispatch(getAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));