import React from 'react';
import { Link } from 'react-router-dom';

const GoogleMailItem = ({ mail }) => {
  let date = null;
  let subject = null;
  mail.payload.headers.forEach(({ name, value }) => {
    switch (name) {
      case 'Date':
        date = new Date(value);
        break;
      case 'Subject':
        subject = value;
        break;
      default:
        break;
    }
  });
  return (
    <section className="section">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            { subject }
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            <span dangerouslySetInnerHTML={ { __html: `${ mail.snippet }...` } } />
            <br />
            <br />
            <time>{ date.toLocaleString() }</time>
          </div>
        </div>
        <footer className="card-footer">
          <Link to={ `/message/google/${ mail.id }` } className="card-footer-item">
            <i className="fas fa-envelope-open-text" />
            &nbsp;
            Open
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default GoogleMailItem;