import React, { useState, useEffect } from 'react';
import MailItem from './MailItem';
import { connect } from 'react-redux';
import { getMail } from '../../store/actions/mailActions';

const Inbox = ({ mail, getMail, isUpdated }) => {
  const [state, setState] = useState({
    display: (
      <div className="container no-mail">
        <div className="level no-mail">
          <div className="level-item has-text-centered">
            <progress className="progress is-primary" max="100" />
          </div>
        </div>
      </div>
    )
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getMail(); }, []);

  useEffect(() => {
    if (mail && mail.length > 0 && mail.some(m => m !== null)) {
      setState({
        ...state,
        display: mail.map((message, i) => message && message.body ? <MailItem key={ message.body.messageId } mail={ message } index={ i }/> : null)
      });
    } else if (mail && mail.every(m => m === null) && isUpdated) {
      setState({
        ...state,
        display: (
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
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mail]);

  return (
    <div className="inbox">
      { state.display }
    </div>
  );
};

const mapStateToProps = state => ({
  mail: state.mail.mail,
  isUpdated: state.mail.isUpdated
});

const mapDispatchToProps = dispatch => ({
  getMail: () => dispatch(getMail())
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);