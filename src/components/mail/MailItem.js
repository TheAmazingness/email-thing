import React from 'react';
import { Link } from 'react-router-dom';

const MailItem = ({ mail, index }) => (
  <section className="section">
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          { mail.body.subject }
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <span className="mail-preview" dangerouslySetInnerHTML={ { __html: mail.body.text ? `${ mail.body.text }...` : '...' } } />
          <br />
          <br />
          <time>{ new Date(mail.body.date).toLocaleString() }</time>
        </div>
      </div>
      <footer className="card-footer">
        <Link to={ `/message/${ index }` } className="card-footer-item">
          <i className="fas fa-envelope-open-text" />
          &nbsp;
          Open
        </Link>
      </footer>
    </div>
  </section>
);

export default MailItem;