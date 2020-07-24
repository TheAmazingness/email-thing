import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSettings, setSettings } from '../../../store/actions/settingsActions';

const ContactsView = ({ contacts, isActive, onClose, getSettings, setSettings }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getSettings(); }, [contacts]);

  const handleClick = (e, email) => {
    const updated = JSON.parse(JSON.stringify(contacts));
    contacts.forEach((contact, i) => {
      if (contact.email === email) {
        updated.splice(i, 1);
      }
    });
    setSettings({ contacts: updated });
  };

  const table = [];
  contacts.forEach(c => table.push(
    <tr key={ c.email }>
      <td className="v-mid">{ c.name }</td>
      <td className="v-mid">{ c.email }</td>
      <td>
        <button className="button is-large is-danger" onClick={ e => handleClick(e, c.email) }>
          <span className="icon is-large">
            <i className="fas fa-trash" />
          </span>
        </button>
      </td>
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
                <th />
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

const mapStateToProps = state => ({
  contacts: state.settings.settings.contacts,
});

const mapDispatchToProps = dispatch => ({
  getSettings: () => dispatch(getSettings()),
  setSettings: setting => dispatch(setSettings(setting))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);