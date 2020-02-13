import React from 'react';
import { Link } from 'react-router-dom';

const SignedInLinks = () => {
  return (
    <>
      <Link className="navbar-item" to="/inbox">Inbox</Link>
      <Link className="navbar-item" to="/settings">Settings</Link>
      <span className="navbar-item">
        <button className="button is-primary">
          <span className="icon">
            <i className="fas fa-door-open" />
          </span>
          <span>Welcome, name!</span>
        </button>
      </span>
    </>
  );
};

export default SignedInLinks;