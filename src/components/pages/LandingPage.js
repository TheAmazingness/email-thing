import React from 'react';
import Navbar from '../layout/Navbar';
import LogoWhite from '../../images/logo.png';
import { Redirect } from 'react-router-dom';
import { get } from '../../helper/fetch';
import { uri } from '../../config/server.json';

const isAuthed = async () => await (await get(`${ uri }/auth/is-authed`)).json();

const LandingPage = () => !isAuthed() ? <Redirect to="/inbox" /> : (
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

export default LandingPage;