import React from 'react';
import Menu from '../layout/Menu';
import Inbox from '../mail/Inbox';
import settingsCheck from '../helper/SettingsCheck';
import authCheck from '../helper/AuthCheck';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ match, google }) => google ? <Redirect to="/inbox/google" /> : (
  <section className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-one-fifth">
          <Menu />
        </div>
        <div className="column no-overflow">
          <Inbox profile={ match.params.profile } />
        </div>
      </div>
    </div>
  </section>
);

const mapStateToProps = state => ({ mail: state.mail.mail, google: state.auth.strategy === 'google' });

export default connect(mapStateToProps)(authCheck(true)(settingsCheck()(Dashboard)));