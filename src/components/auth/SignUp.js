import React, { useState } from 'react';
import authCheck from '../helper/AuthCheck';
import { Link } from 'react-router-dom';
import { uri } from '../../config/server';
import { direct } from '../../helper/fetch';

const SignUp = () => {
  const [state, setState] = useState({
    email: null,
    pass: null,
    first: null,
    last: null,
    imap: null,
    imapport: null,
    smtp: null,
    smtpport: null,
    settings: 'is-hidden'
  });

  const handleChange = e => setState({ ...state, [e.target.id]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const host = state.email.split('@')[1];
    if (host === 'gmail.com') {
      direct(`${ uri }/auth/google`, {
        email: state.email,
        pass: state.pass
      });
    } else {
      if ((host !== 'hotmail.com' && host !== 'outlook.com') || (!state.imap || !state.smtp)) {
        setState({ ...state, settings: '' });
      } else {
        direct(`${ uri }/auth/signup`, state);
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">
            Sign Up
            &emsp;
            <i className="fas fa-key" />
          </h1>
          <form onSubmit={ handleSubmit }>
            <label className="label">Name</label>
            <div className="field is-grouped">
              <div className="control is-expanded has-icons-left">
                <input className="input" type="text" placeholder="First Name" id="first" onChange={ handleChange } />
                <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
              </div>
              <div className="control is-expanded has-icons-left">
                <input className="input" type="text" placeholder="Last Name" id="last" onChange={ handleChange } />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <div className="control has-icons-left">
                <input className="input" type="email" placeholder="Email" id="email" onChange={ handleChange } autoComplete="username" />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="pass">Password</label>
              <div className="control has-icons-left">
                <input className="input" type="password" placeholder="Password" id="pass" onChange={ handleChange } autoComplete="current-password" />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </div>
            </div>
            <div className={ `mb-4 ${ state.settings }` }>
              <div className="columns">
                <div className="column is-10">
                  <label className="label" htmlFor="imap">IMAP</label>
                  <div className="control is-expanded has-icons-left">
                    <input className="input" type="text" placeholder="imap.example.com" id="imap" onChange={ handleChange } />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope-open-text" />
                    </span>
                  </div>
                </div>
                <div className="column is-2">
                  <label className="label" htmlFor="imapport">Port</label>
                  <div className="control is-expanded has-icons-left">
                    <input className="input" type="number" placeholder="993" id="imapport" onChange={ handleChange } />
                    <span className="icon is-small is-left">
                      <i className="fas fa-database" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-10">
                  <label className="label" htmlFor="smtp">SMTP</label>
                  <div className="control is-expanded has-icons-left">
                    <input className="input" type="text" placeholder="smtp.example.com" id="smtp" onChange={ handleChange } />
                    <span className="icon is-small is-left">
                      <i className="fas fa-paper-plane" />
                    </span>
                  </div>
                </div>
                <div className="column is-2">
                  <label className="label" htmlFor="smtpport">Port</label>
                  <div className="control is-expanded has-icons-left">
                    <input className="input" type="number" placeholder="587" id="smtpport" onChange={ handleChange } />
                    <span className="icon is-small is-left">
                      <i className="fas fa-database" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary is-fullwidth">
                  <i className="fas fa-key" />
                  &nbsp;
                  Sign Up
                </button>
                <br />
                <Link to="/signin">Already have an account? Click here to sign in!</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default authCheck(false)(SignUp);