import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
  token: state.auth.accessToken,
  id: state.auth.id
});

const AuthChecker = connect(mapStateToProps)(({ token, id, children, authed }) =>
  (authed && (!token || !id)) || (!authed && (token || id)) ?
    <Redirect to="/" /> :
    children
);

const authCheck = shouldBeAuthed => Component => props => (
  <AuthChecker authed={ shouldBeAuthed }>
    <Component { ...props } />
  </AuthChecker>
);

export default authCheck;