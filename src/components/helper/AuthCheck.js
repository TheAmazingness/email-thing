import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAuth } from '../../store/actions/authActions';

const mapStateToProps = state => ({
  auth: state.auth.auth
});

const mapDispatchToProps = dispatch => ({
  getAuth: () => dispatch(getAuth())
});

const AuthChecker = connect(mapStateToProps, mapDispatchToProps)(({ children, authed, getAuth, auth }) => {
  useEffect(() => { getAuth() }, []);

  return (authed && !auth) || (!authed && auth) ?
    <Redirect to="/" /> :
    children
});

const authCheck = shouldBeAuthed => Component => props => (
  <AuthChecker authed={ shouldBeAuthed }>
    <Component { ...props } />
  </AuthChecker>
);

export default authCheck;