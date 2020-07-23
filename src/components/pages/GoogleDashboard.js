import React from 'react';
import Menu from '../layout/Menu';
import GoogleInbox from '../mail/GoogleInbox';
import authCheck from '../helper/AuthCheck';
import settingsCheck from '../helper/SettingsCheck';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const GoogleDashboard = ({ match, google }) => !google ? <Redirect to="/inbox" /> : (
  <section className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-one-fifth">
          <Menu />
        </div>
        <div className="column">
          <GoogleInbox profile={ match.params.profile } />
        </div>
      </div>
    </div>
  </section>
);

const mapStateToProps = state => ({ googleMail: state.mail.googleMail, google: state.auth.strategy === 'google' });

export default connect(mapStateToProps)(authCheck(true)(settingsCheck()(GoogleDashboard)));