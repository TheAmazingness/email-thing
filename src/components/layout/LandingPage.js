import React from 'react';
import Navbar from './Navbar';
import LogoWhite from '../../images/logo.png';

const LandingPage = () => {
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

export default LandingPage;