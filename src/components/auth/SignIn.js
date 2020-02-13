import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [state, setState] = useState({
    email: null,
    pass: null
  });

  const handleChange = e => setState({ ...state, [e.target.id]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
  };

	return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          <i className="fas fa-key" />
          &emsp;
          Sign In
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
    </section>
	);
};

export default SignIn;