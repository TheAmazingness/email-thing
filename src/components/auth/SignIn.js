import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { uri } from '../../config/server';
import { key } from '../../config/key';

const SignIn = ({ match }) => {
  useEffect(() => {
    if (match) {
      if (match.params.failure === 'failure') {
        setState({
          ...state,
          failure: (
            <article className="message is-danger">
              <div className="message-header">
                <p>
                  <i className="fas fa-exclamation-triangle" />
                  &emsp;
                  Incorrect email or password
                </p>
              </div>
            </article>
          )
        });
      } else if (match.params.failure === 'signup') {
        setState({
          ...state,
          failure: (
            <article className="message is-danger">
              <div className="message-header">
                <p>
                  <i className="fas fa-exclamation-triangle" />
                  &emsp;
                  You already have an account!
                </p>
              </div>
            </article>
          )
        });
      }
    }
  }, []);

  const [state, setState] = useState({
    email: null,
    pass: null,
    failure: null
  });

  const handleChange = e => setState({ ...state, [e.target.id]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (state.email.split('@')[1] === 'gmail.com') {
      window.location.assign(`${ uri }/auth?provider=google&email=${ state.email }&pass=${ state.pass }&key=${ key }`);
    } else {
      const response = await fetch(`${ uri }/auth/other`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `username=${ state.email }&password=${ state.pass }`
      });
      const data = await response.json();
      if (data.message && data.message === 'failed to auth') {
        window.location.assign('/signin/failure');
      } else {
        window.location.assign(`/inbox/${ data }`);
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        { state.failure }
        <div className="box">
          <h1 className="title">
            Sign In
            &emsp;
            <i className="fas fa-key" />
          </h1>
        </div>
        <div className="box">
          <form onSubmit={ handleSubmit }>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <div className="control has-icons-left">
                <input className="input" type="email" placeholder="Email" id="email" onChange={ handleChange } />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="pass">Password</label>
              <div className="control has-icons-left">
                <input className="input" type="password" placeholder="Password" id="pass" onChange={ handleChange } />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary is-fullwidth">
                  <i className="fas fa-key" />
                  &nbsp;
                  Sign In
                </button>
                <br />
                <Link to="/signup">Don't have an account? Click here to sign up!</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};


export default SignIn;