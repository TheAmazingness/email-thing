import React from 'react';
import { connect } from 'react-redux';

const Mail = ({ match, mail }) => {
  const id = match.params.id;
  let selectedMail = null;
  let subject = null;
  let html = null;

  mail.forEach(m => {
    if (m.id === id) {
      selectedMail = m;
    }
  });

  selectedMail.payload.headers.forEach(({ name, value }) => {
    switch (name) {
      case 'Subject':
        subject = value;
        break;
    }
  });

  selectedMail.payload.parts.forEach(({ mimeType, body }) => {
    if (!html && mimeType === 'text/plain') {
      html = window.atob(body.data.replace(/-/g, '+').replace(/_/g, '/'));
    } else if (mimeType === 'text/html') {
      html = window.atob(body.data.replace(/-/g, '+').replace(/_/g, '/'));
    }
  });

  return (
    <section className="section">
      <div className="container">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              { subject }
            </p>
          </header>
          <div className="card-content">
            <div className="content mail-body" dangerouslySetInnerHTML={ { __html: html } } />
          </div>
          {/*<footer className="card-footer">*/}
          {/*  <span href="#" className="card-footer-item">Save</span>*/}
          {/*  <span href="#" className="card-footer-item">Edit</span>*/}
          {/*  <span href="#" className="card-footer-item">Delete</span>*/}
          {/*</footer>*/}
        </div>
      </div>
    </section>
	);
};

const mapStateToProps = state => ({
  mail: state.mail.mail
});

export default connect(mapStateToProps)(Mail);