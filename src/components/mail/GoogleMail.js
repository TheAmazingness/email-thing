import React from 'react';
import settingsCheck from '../helper/settingsCheck';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { readGoogleMail } from '../../store/actions/mailActions';

const GoogleMail = ({ match, googleMail, readGoogleMail }) => {
  const id = match.params.id;
  let selectedMail = null;
  let subject = null;
  let html = null;

  googleMail.forEach(m => {
    if (m.id === id) {
      selectedMail = m;
    }
  });

  try {
    if (selectedMail.labelIds.includes('UNREAD')) {
      readGoogleMail(selectedMail.id);
    }

    selectedMail.payload.headers.forEach(({ name, value }) => {
      if (name === 'Subject') {
        subject = value;
      }
    });

    if (selectedMail.payload.body.data) {
      html = window.atob(selectedMail.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
    } else {
      selectedMail.payload.parts.forEach(({ mimeType, body }) => {
        if (!html && mimeType === 'text/plain') {
          html = window.atob(body.data.replace(/-/g, '+').replace(/_/g, '/'));
        } else if (mimeType === 'text/html') {
          html = window.atob(body.data.replace(/-/g, '+').replace(/_/g, '/'));
        }
      });
    }
  } catch (e) {
    return <Redirect to="/inbox/google" />;
  }

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
            <div className="content">
              <iframe className="mail-body" title="mail-body" srcDoc={ html } />
            </div>
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
  googleMail: state.mail.googleMail
});

const mapDispatchToProps = dispatch => ({
  readGoogleMail: id => dispatch(readGoogleMail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(settingsCheck({ help: true })(GoogleMail));