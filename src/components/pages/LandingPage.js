import React from 'react';
import Navbar from '../layout/Navbar';
import LogoWhite from '../../images/logo.png';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const LandingPage = ({ id, token }) => {
  if (id) {
    return <Redirect to="/inbox" />;
  } else if (token) {
    return <Redirect to="/inbox/google" />;
  }
  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-head">
        <Navbar overrideLocationHiding />
      </div>
      <div className="hero-body">
        <div className="container has-text-centered">
          <figure className="image has-ratio">
            <img src={ LogoWhite } alt="AbleMail" />
          </figure>
          <h1 className="title">
            Furthering independence through email
          </h1>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  id: state.auth.id,
  token: state.auth.accessToken
});

export default connect(mapStateToProps)(LandingPage);