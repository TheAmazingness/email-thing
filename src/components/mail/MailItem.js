import React from 'react';

const MailItem = () => {
	return (
    <section className="section">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Component
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
          <span href="#" className="card-footer-item">Save</span>
          <span href="#" className="card-footer-item">Edit</span>
          <span href="#" className="card-footer-item">Delete</span>
        </footer>
      </div>
    </section>
	);
};

export default MailItem;