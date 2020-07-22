import React, { useState, useEffect } from 'react';
import authCheck from '../helper/AuthCheck';
import { Link } from 'react-router-dom';
import { uri } from '../../config/server';
import { direct, postQuery } from '../../helper/fetch';
import { getAuth } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const SignIn = ({ match, getAuth }) => {
  useEffect(() => {
    if (match) {
      if (match.params.failure === 'failure') {
        setState({
          ...state,
          update: (
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
          update: (
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({
    email: null,
    pass: null,
    update: null
  });

  const handleChange = e => setState({ ...state, [e.target.id]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (state.email.split('@')[1] === 'gmail.com') {
      direct(`${ uri }/auth/google`, {
        email: state.email,
        pass: state.pass
      });
    } else {
      const response = await postQuery(`${ uri }/auth/other`, {
        username: state.email,
        password: state.pass
      });
      const data = await response.text();
      if (data && data === 'failed to auth') {
        setState({
          ...state,
          update: <Redirect to="/signin/failure" />
        });
      } else {
        getAuth(true);
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        { state.update }
        <div className="box">
          <h1 className="title">
            Sign In
            &emsp;
            <i className="fas fa-key" />
          </h1>
          <form onSubmit={ handleSubmit }>
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

const mapDispatchToProps = dispatch => ({
  getAuth: expectStatusChange => dispatch(getAuth(expectStatusChange))
});

export default connect(null, mapDispatchToProps)(authCheck(false)(SignIn));