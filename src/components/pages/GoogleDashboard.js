import React from 'react';
import Menu from '../layout/Menu';
import Inbox from '../mail/Inbox';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const GoogleDashboard = ({ mail, match, accessToken }) => {
  if (!accessToken) {
    return <Redirect to="/" />;
  }
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-fifth">
            <Menu />
          </div>
          <div className="column">
            <Inbox mail={ mail } profile={ match.params.profile } />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  mail: state.mail.mail,
  accessToken: state.auth.accessToken
});

export default connect(mapStateToProps)(GoogleDashboard);