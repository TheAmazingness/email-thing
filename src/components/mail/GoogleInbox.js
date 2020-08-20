import React, { useState, useEffect } from 'react';
import GoogleMailItem from './GoogleMailItem';
import { connect } from 'react-redux';
import { getGoogleMail } from '../../store/actions/mailActions';

const GoogleInbox = ({ googleMail, getGoogleMail, isUpdated }) => {
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
  useEffect(() => { getGoogleMail(); }, []);

  useEffect(() => {
    if (googleMail && googleMail.length > 0 && googleMail.some(m => m !== null)) {
      setState({
        ...state,
        display: googleMail.map(m => <GoogleMailItem mail={ m } key={ m.id } />)
      });
    } else if (googleMail && googleMail.every(m => m === null) && isUpdated) {
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
  }, [isUpdated]);

  return (
    <div className="inbox">
      { state.display }
    </div>
  );
};

const mapStateToProps = state => ({
  googleMail: state.mail.googleMail,
  isUpdated: state.mail.isUpdated
});

const mapDispatchToProps = dispatch => ({
  getGoogleMail: () => dispatch(getGoogleMail())
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleInbox);