import React, { useEffect } from 'react';
import Navbar from '../layout/Navbar';
import LogoWhite from '../../images/logo.png';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAuth } from '../../store/actions/authActions';

const LandingPage = ({ auth, getAuth }) => {
  useEffect(() => { getAuth(); }, []);

  return auth ? <Redirect to="/inbox" /> : (
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
}

const mapStateToProps = state => ({
  auth: state.auth.auth
});

const mapDispatchToProps = dispatch => ({
  getAuth: () => dispatch(getAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);