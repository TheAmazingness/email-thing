import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveAccessToken } from '../../store/actions/authActions';

const GoogleTokenSaver = ({ saveAccessToken, match }) => {
  useEffect(() => { saveAccessToken(match.params.profile); }, []);
  return <Redirect to="/inbox/google" />;
};

const mapDispatchtoProps = dispatch => ({ saveAccessToken: token => dispatch(saveAccessToken(token)) });

export default connect(null, mapDispatchtoProps)(GoogleTokenSaver);