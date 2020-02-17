import React from 'react';
import { Link } from 'react-router-dom';

const SignedInLinks = () => {
  return (
    <>
      <Link className="navbar-item" to="/inbox">Inbox</Link>
      <Link className="navbar-item" to="/settings">Settings</Link>
    </>
  );
};

export default SignedInLinks;