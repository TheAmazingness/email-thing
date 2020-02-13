import React from 'react';
import MailItem from './MailItem';

const Inbox = () => {
  return (
    <div className="inbox">
      <MailItem />
      <MailItem />
      <MailItem />
    </div>
  );
};

export default Inbox;