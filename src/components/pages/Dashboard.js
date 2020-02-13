import React from 'react';
import Menu from '../layout/Menu';
import Inbox from '../mail/Inbox';
import { connect } from 'react-redux';

const Dashboard = ({ mail }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-fifth">
            <Menu />
          </div>
          <div className="column">
            <Inbox mail={ mail } />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
    mail: state.mail.mail
});

export default connect(mapStateToProps)(Dashboard);