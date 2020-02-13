import React from 'react';
import { Link } from 'react-router-dom';

const MailItem = () => {
	return (
    <section className="section">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Name
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
            <br />
            <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        <footer className="card-footer">
          <Link to="/" className="card-footer-item">
            <i className="fas fa-envelope-open-text" />
            &nbsp;
            Open
          </Link>
        </footer>
      </div>
    </section>
	);
};

export default MailItem;