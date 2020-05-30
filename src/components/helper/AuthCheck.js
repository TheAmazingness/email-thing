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

const AuthChecker = connect(mapStateToProps, mapDispatchToProps)(({ children, shouldBeAuthed, getAuth, auth }) => {
  useEffect(() => { getAuth(); }, []);

  if (auth === null) return <div className="pageloader is-active"><h1 className="title">Authenticating</h1></div>;

  return (shouldBeAuthed && !auth) || (!shouldBeAuthed && auth) ?
    <Redirect to="/" /> :
    children
});

const authCheck = shouldBeAuthed => Component => props => (
  <AuthChecker shouldBeAuthed={ shouldBeAuthed }>
    <Component { ...props } />
  </AuthChecker>
);

export default authCheck;