import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSettings } from '../../store/actions/settingsActions';

const mapStateToProps = state => ({
  settings: state.settings.settings
});

const mapDispatchToProps = dispatch => ({
  getSettings: () => dispatch(getSettings())
});

const SettingsChecker = connect(mapStateToProps, mapDispatchToProps)(({ children, getSettings, settings }) => {
  useEffect(() => { getSettings(); }, []);

  const props = { className: [] };

  if (settings.tts) {
    // TODO: Implement TTS
  }
  if (settings.large) {
    console.log(1);
    props.className.push('font-large');
  }

  return (
    <span { ...props }>
      { children }
    </span>
  );
});

const settingsCheck = Components => props => (
  <SettingsChecker>
    <Components { ...props } />
  </SettingsChecker>
);

export default settingsCheck;