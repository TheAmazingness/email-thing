import React from 'react';
import settingsCheck from '../helper/settingsCheck';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Mail = ({ match, mail }) => {
  let selectedMail = mail[match.params.id];

  if (!selectedMail) {
    return <Redirect to="/inbox" />;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              { selectedMail.body.subject }
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <iframe className="mail-body" title="mail-body" srcDoc={ selectedMail.body.html ? selectedMail.body.html : selectedMail.body.textAsHtml } />
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
  mail: state.mail.mail
});

export default connect(mapStateToProps)(settingsCheck({ help: true })(Mail));