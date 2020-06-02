import React, { useState, useEffect } from 'react';
import authCheck from '../helper/AuthCheck';
import ContactsView from '../helper/settings/ContactsView';
import { connect } from 'react-redux';
import { getSettings, setSettings } from '../../store/actions/settingsActions';

const Settings = ({ settings, getSettings, setSettings }) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    contactsView: false
  });

  const s = settings.settings;

  useEffect(() => { getSettings(); }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">
            Settings
            &emsp;
            <i className="fas fa-cogs" />
          </h1>
          <section className="section">
            <div className="container">
              <div className="settings-wrap no-overflow">
                <div className="tile is-ancestor">
                  <div className="tile is-vertical is-8">
                    <div className="tile">
                      <div className="tile is-parent is-vertical">
                        <article className="tile is-child notification is-primary">
                          <p className="title">
                            Text-to-Speech
                            &emsp;
                            <i className="fas fa-volume-up" />
                          </p>
                          <p className="subtitle">{ s.tts ? 'On' : 'Off' }</p>
                          <div className="field">
                            <input
                              id="tts"
                              type="checkbox"
                              name="tts"
                              className="switch"
                              onChange={ e => setSettings({ [e.target.name]: e.target.checked })}
                              checked={ s.tts }
                            />
                            <label htmlFor="tts" />
                          </div>
                        </article>
                        <article className="tile is-child notification is-warning">
                          <p className="title">
                            Larger Font
                            &emsp;
                            <i className="fas fa-text-height" />
                          </p>
                          <p className="subtitle">{ s.large ? 'Larger' : 'Smaller' }</p>
                          <div className="field">
                            <input
                              id="large"
                              type="checkbox"
                              name="large"
                              className="switch"
                              onChange={ e => setSettings({ [e.target.name]: e.target.checked })}
                              checked={ s.large }
                            />
                            <label htmlFor="large" />
                          </div>
                        </article>
                      </div>
                      <div className="tile is-parent">
                        <article className="tile is-child notification is-info">
                          <p className="title">
                            Voice Email
                            &emsp;
                            <i className="fas fa-envelope" />
                          </p>
                          <p className="subtitle">{ s.voicemail ? 'On' : 'Off' }</p>
                          <div className="field">
                            <input
                              id="voicemail"
                              type="checkbox"
                              name="voicemail"
                              className="switch"
                              onChange={ e => setSettings({ [e.target.name]: e.target.checked })}
                              checked={ s.voicemail }
                            />
                            <label htmlFor="voicemail" />
                          </div>
                        </article>
                      </div>
                    </div>
                    <div className="tile is-parent is-vertical">
                      <article className="tile is-child notification is-light">
                        <p className="title">
                          Help Email
                          &emsp;
                          <i className="fas fa-question-circle" />
                        </p>
                        <p className="subtitle">Email: { s.help }</p>
                        <div className="field">
                          <div className="control">
                            <p className="control has-icons-left">
                              <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                name="help"
                                onKeyDown={ e => {
                                  if (e.key === 'Enter') {
                                    setSettings({ [e.target.name]: e.target.value });
                                  }
                                } }
                                defaultValue={ s.help }
                              />
                              <span className="icon is-small is-left">
                              <i className="fas fa-envelope"/>
                            </span>
                            </p>
                          </div>
                        </div>
                      </article>
                      <article className="tile is-child notification is-dark">
                        <div className="columns">
                          <div className="column is-7">
                            <p className="title">
                              Contacts
                              &emsp;
                              <i className="fas fa-address-book" />
                            </p>
                            <p className="subtitle">Number of contacts: { s.contacts.length }</p>
                          </div>
                          <div className="column">
                            <div className="level">
                              <div className="level-left">
                                <button
                                  className="button is-large is-success"
                                  onClick={ () => {
                                    setSettings({ contacts: [...s.contacts, state] });
                                    setState({ ...state, name: '', email: '' });
                                  } }
                                >
                                <span className="icon is-large">
                                  <i className="fas fa-plus" />
                                </span>
                                </button>
                              </div>
                              <div className="level-right">
                                <button
                                  className="button is-success"
                                  onClick={ () => setState({ ...state, contactsView: true }) }
                                >
                                  View Contacts
                                  &emsp;
                                  <i className="fas fa-address-book" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <p className="control has-icons-left">
                              <input
                                className="input"
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={ e => setState({ ...state, [e.target.name]: e.target.value }) }
                                value={ state.name }
                              />
                              <span className="icon is-small is-left">
                            <i className="fas fa-user"/>
                          </span>
                            </p>
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <p className="control has-icons-left">
                              <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={ e => setState({ ...state, [e.target.name]: e.target.value }) }
                                value={ state.email }
                              />
                              <span className="icon is-small is-left">
                            <i className="fas fa-envelope"/>
                          </span>
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                  <div className="tile is-vertical">
                    <div className="tile is-parent">
                      <article className="tile is-child notification is-success">
                        <div className="content">
                          <p className="title">
                            Voice Recognition
                            &emsp;
                            <i className="fas fa-microphone" />
                          </p>
                          <p className="subtitle">{ s.recognition ? 'On' : 'Off' }</p>
                          <div className="field">
                            <input
                              id="recognition"
                              type="checkbox"
                              name="recognition"
                              className="switch"
                              onChange={ e => setSettings({ [e.target.name]: e.target.checked })}
                              checked={ s.recognition }
                            />
                            <label htmlFor="recognition" />
                          </div>
                        </div>
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child notification is-danger">
                        <p className="title">
                          Dyslexia-Friendly
                          &emsp;
                          <i className="fas fa-font" />
                        </p>
                        <p className="subtitle">{ s.dyslexia ? 'OpenDyslexic' : 'Default Font' }</p>
                        <div className="field">
                          <input
                            id="dyslexia"
                            type="checkbox"
                            name="dyslexia"
                            className="switch"
                            onChange={ e => setSettings({ [e.target.name]: e.target.checked })}
                            checked={ s.dyslexia }
                          />
                          <label htmlFor="dyslexia" />
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <ContactsView isActive={ state.contactsView } contacts={ s.contacts } onClose={ () => setState({ ...state, contactsView: false }) } />
    </>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  getSettings: () => dispatch(getSettings()),
  setSettings: settings => dispatch(setSettings(settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(authCheck(true)(Settings));