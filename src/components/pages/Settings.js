import React, { useEffect } from 'react';
import authCheck from '../helper/AuthCheck';
import { connect } from 'react-redux';
import { getSettings, setSettings } from '../../store/actions/settingsActions';

const Settings = ({ settings, getSettings, setSettings }) => {
  const s = settings.settings;

  useEffect(() => { getSettings(); }, []);

  return (
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
                        <p className="title">Text-to-Speech</p>
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
                        <p className="title">Larger Font</p>
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
                        <p className="title">Voice Email</p>
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
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-danger">
                      <p className="title">Dyslexia-Friendly Font</p>
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
                <div className="tile is-parent">
                  <article className="tile is-child notification is-success">
                    <div className="content">
                      <p className="title">Voice Recognition</p>
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
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