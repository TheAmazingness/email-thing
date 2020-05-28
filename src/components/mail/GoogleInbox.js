import React, { useState, useEffect } from 'react';
import GoogleMailItem from './GoogleMailItem';
import { connect } from 'react-redux';
import { getGoogleMail } from '../../store/actions/mailActions';

const GoogleInbox = ({ googleMail, getGoogleMail }) => {
  useEffect(() => {
    getGoogleMail();
  }, []);

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

  const list = googleMail && googleMail.length > 0 ? googleMail.map(m => <GoogleMailItem mail={ m } key={ m.id } />) : state.noMail;

  // if (!mail || mail.length === 0) {
  //   setTimeout(() => setState({
  //     ...state,
  //     noMail: (
  //       <div className="container no-mail">
  //         <div className="level no-mail">
  //           <div className="level-item has-text-centered">
  //             <h1 className="title is-1 has-text-primary">
  //               <i className="fas fa-folder-open" />
  //               &nbsp;
  //               No mail!
  //             </h1>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   }), 5000);
  // }

  return (
    <div className="inbox">
      { list }
    </div>
  );
};

const mapStateToProps = state => ({
  googleMail: state.mail.googleMail
});

const mapDispatchToProps = dispatch => ({
  getGoogleMail: () => dispatch(getGoogleMail())
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleInbox);