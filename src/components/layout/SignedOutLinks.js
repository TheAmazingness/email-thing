import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <>
      <Link className="navbar-item" to="/">Home</Link>
      <Link className="navbar-item" to="/about">About</Link>
      <span className="navbar-item">
        <Link className="button is-primary is-inverted" to="/signup">
          <span className="icon">
            <i className="fas fa-key" />
          </span>
          <span>Sign Up</span>
        </Link>
      </span>
      <Link className="navbar-item" to="/signin">Sign In</Link>
    </>
  );
};

export default SignedOutLinks;