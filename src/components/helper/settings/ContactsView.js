import React from 'react';

const ContactsView = ({ contacts, isActive, onClose }) => {
  const table = [];

  contacts.forEach(c => table.push(
    <tr key={ c.email }>
      <td>{ c.name }</td>
      <td>{ c.email }</td>
    </tr>
  ));

  return (
    <div className={ `modal ${ isActive ? 'is-active' : '' }` }>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Contacts
            &emsp;
            <i className="fas fa-address-book" />
          </p>
          <button className="delete" aria-label="close" onClick={ onClose } />
        </header>
        <section className="modal-card-body">
          <div className="container">
            <table className="table contacts-table">
              <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
              </thead>
              <tbody>
              { table }
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactsView;