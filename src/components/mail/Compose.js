import React, { useState } from 'react';
import { compose } from '../../store/actions/mailActions';
import { connect } from 'react-redux';

const Compose = props => {
  const [state, setState] = useState({
    to: null,
    subject: null,
    body: null
  });

  const handleChange = e => setState({ ...state, [e.target.id]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    props.compose(state);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          <i className="fas fa-edit" />
          &emsp;
          Compose Email
        </h1>
        <form onSubmit={ handleSubmit }>
          <div className="field">
            <div className="control has-icons-left">
              <input className="input" type="email" placeholder="To" id="to" onChange={ handleChange } />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Subject" id="subject" onChange={ handleChange } />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea className="textarea" placeholder="Body" id="body" onChange={ handleChange } />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary is-fullwidth">
                <i className="fas fa-paper-plane" />
                &nbsp;
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const mapDispatchToProps = dispatch => ({
  compose: mail => dispatch(compose(mail))
});

export default connect(null, mapDispatchToProps)(Compose);