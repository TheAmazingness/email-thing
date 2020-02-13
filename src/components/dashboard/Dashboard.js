import React from 'react';
import Menu from '../layout/Menu';
import Inbox from '../mail/Inbox';

const Dashboard = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-fifth">
            <Menu />
          </div>
          <div className="column">
            <Inbox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;