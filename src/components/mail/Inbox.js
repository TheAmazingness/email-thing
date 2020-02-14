import React, { useState, useEffect } from 'react';
import MailItem from './MailItem';
import { connect } from 'react-redux';
import { getMail } from '../../store/actions/mailActions';

const Inbox = ({ mail, getMail }) => {
  useEffect(() => {
    getMail();
  });

  const [state, setState] = useState({
    noMail: (
      <div className="container no-mail">
        <div className="level no-mail">
          <div className="level-item has-text-centered">
            <progress className="progress is-primary" max="100" />
          </div>
        </div>
      </div>
    )
  });
  const list = mail ? mail.map(m => <MailItem mail={ m } key={ m.id } />) : state.noMail;

  if (!mail) {
    setTimeout(() => setState({
      ...state,
      noMail: (
        <div className="container no-mail">
          <div className="level no-mail">
            <div className="level-item has-text-centered">
              <h1 className="title is-1 has-text-primary">
                <i className="fas fa-folder-open" />
                &nbsp;
                No mail!
              </h1>
            </div>
          </div>
        </div>
      )
    }), 5000);
  }

  return (
    <div className="inbox">
      { list }
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getMail: () => dispatch(getMail())
});

export default connect(null, mapDispatchToProps)(Inbox);