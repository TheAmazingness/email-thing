import React from 'react';
import MailItem from './MailItem';

const Inbox = ({ mail }) => {
  const list = mail ? mail.map(m => (
    <MailItem mail={ m } key={ m.id } />
  )) : (
    <div className="container no-mail">
      <div className="level no-mail">
        <div className="level-item has-text-centered">
          <h1 className="title">
            <i className="fas fa-folder-open" />
            &nbsp;
            No mail!
          </h1>
        </div>
      </div>
    </div>
  );
  return (
    <div className="inbox">
      { list }
    </div>
  );
};

export default Inbox;