import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uri } from '../../config/server.json';
import { key } from '../../config/key.json';
import { Redirect } from 'react-router-dom';

const Compose = ({ id }) => {
  const [state, setState] = useState({
    to: null,
    subject: null,
    body: null,
    sending: null,
    sent: null
  });

  const handleChange = e => setState({ ...state, [e.target.id]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setState({
      ...state,
      sending: (
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content">
            <progress className="progress is-primary" max="100" />
          </div>
        </div>
      )
    });
    const { sent } = await (await fetch(`${ uri }/send`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `key=${ key }&id=${ id }&to=${ state.to }&subject=${ state.subject }&body=${ state.body }`
    })).json();
    if (!sent) {
      setState({ ...state, sending: null });
    } else {
      setState({ ...state, sent: <Redirect to="/" /> });
    }
  };

  return (
    <section className="section">
      <div className="container">
        { state.sending }
        { state.sent }
        <div className="box">
          <h1 className="title">
            Compose Email
            &emsp;
            <i className="fas fa-edit" />
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
                <textarea className="textarea" rows="10" placeholder="Body" id="body" onChange={ handleChange } />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary is-fullwidth is-large">
                  <h1 className="title has-text-white">
                    <i className="fas fa-paper-plane" />
                    &emsp;
                    Send
                  </h1>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  id: state.auth.id
});

export default connect(mapStateToProps)(Compose);