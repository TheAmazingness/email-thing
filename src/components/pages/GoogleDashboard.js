import React from 'react';
import Menu from '../layout/Menu';
import GoogleInbox from '../mail/GoogleInbox';
import authCheck from '../helper/AuthCheck';
import { connect } from 'react-redux';

const GoogleDashboard = ({ mail, match }) => (
  <section className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-one-fifth">
          <Menu />
        </div>
        <div className="column">
          <GoogleInbox mail={ mail } profile={ match.params.profile } />
        </div>
      </div>
    </div>
  </section>
);

const mapStateToProps = state => ({ mail: state.mail.mail });

export default connect(mapStateToProps)(authCheck(true)(GoogleDashboard));