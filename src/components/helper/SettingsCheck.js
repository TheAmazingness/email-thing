import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSettings } from '../../store/actions/settingsActions';
import handleTtsClick from './settings/tts';
import handleHelpClick from './settings/help';
import { filterMail, filterGoogleMail } from '../../store/actions/mailActions';

const mapStateToProps = state => ({
  settings: state.settings.settings
});

const mapDispatchToProps = dispatch => ({
  getSettings: () => dispatch(getSettings()),
  filterMail: () => dispatch(filterMail()),
  filterGoogleMail: () => dispatch(filterGoogleMail())
});

let unfiltered = true;

const SettingsChecker = connect(mapStateToProps, mapDispatchToProps)(
  ({ children, getSettings, settings, help, mail, googleMail, match, filterMail, filterGoogleMail }) => {
    useEffect(() => {
      getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
      if (settings.contacts.length > 0 && unfiltered) {
        if (googleMail && googleMail.length > 0) {
          filterGoogleMail();
          unfiltered = false;
        } else if (mail && mail.length > 0) {
          filterMail();
          unfiltered = false;
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings, mail, googleMail]);

    const props = { className: [], children: [] };

    if (settings.tts) {
      props.children.push(
        <button className="button is-large is-danger fab-tts" key="btn-tts" onClick={ handleTtsClick }>
          <span className="icon is-large">
            <i className="fas fa-volume-up" />
          </span>
        </button>
      );
    }
    if (settings.large) {
      props.className.push('font-large');
    }
    if (settings.dyslexia) {
      props.className.push('font-dyslexia');
    }
    if (settings.help !== '' && help) {
      props.children.push(
        <button
          className="button is-large is-danger fab-help"
          key="btn-help"
          onClick={ () => handleHelpClick(mail ? mail[match.params.id] : googleMail, settings.help) }
        >
          <span className="icon is-large">
            <i className="fas fa-question-circle" />
          </span>
        </button>
      );
    }

    props.className = props.className.join(' ');

    return (
      <span { ...props }>
        { children }
        { props.children }
      </span>
    );
  }
);

const settingsCheck = (settingsProps = { help: false }) => Components => props => (
  <SettingsChecker { ...settingsProps } { ...props }>
    <Components { ...props } />
  </SettingsChecker>
);

export default settingsCheck;