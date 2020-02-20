import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const SignedInLinks = ({ accessToken }) => (
  <>
    <Link className="navbar-item" to={ `/inbox${ accessToken ? '/google' : '' }` }>Inbox</Link>
    <Link className="navbar-item" to="/settings">Settings</Link>
  </>
);

const mapStateToProps = state => ({ accessToken: state.auth.accessToken });

export default connect(mapStateToProps)(SignedInLinks);