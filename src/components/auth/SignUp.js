import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { key } from '../../config/key';

const SignUp = () => {
  const [state, setState] = useState({
    email: null,
    pass: null,
    first: null,
    last: null
  });

  const handleChange = e => setState({ ...state, [e.target.id]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleClick = e => {
    if (e.target.id === 'auth-google') {
      window.location.href = `http://localhost:8000/auth?provider=google&key=${ key }`;
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
        <div className="box">
          <button id="auth-google" className="button is-danger is-large is-fullwidth" onClick={ handleClick }>
            <i className="fab fa-google" />
            &emsp;
            Sign up with Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignUp;