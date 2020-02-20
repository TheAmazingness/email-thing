import React from 'react';
import Menu from '../layout/Menu';
import Inbox from '../mail/Inbox';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ mail, match, id }) => {
  if (!id) {
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
  id: state.auth.id
});

export default connect(mapStateToProps)(Dashboard);