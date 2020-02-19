import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveId } from '../../store/actions/authActions';

const IdSaver = ({ saveId, match }) => {
  useEffect(() => { saveId(match.params.profile); }, []);
  return <Redirect to="/inbox" />;
};

const mapDispatchtoProps = dispatch => ({ saveId: id => dispatch(saveId(id)) });

export default connect(null, mapDispatchtoProps)(IdSaver);