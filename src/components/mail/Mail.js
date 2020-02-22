import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Mail = ({ match, mail }) => {
  let selectedMail = null;

  mail.forEach(m => {
    if (m && m.messageId === match.params.id) {
      selectedMail = m;
    }
  });

  if (!selectedMail) {
    return <Redirect to="/inbox" />;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              { selectedMail.subject }
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <iframe className="mail-body" title="mail-body" srcDoc={ selectedMail.html ? selectedMail.html : selectedMail.textAsHtml } />
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

export default connect(mapStateToProps)(Mail);