const initState = {
  googleMail: [],
  mail: [],
  isUpdated: false
};

const mailReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_GOOGLE_MAIL':
      return ({
        ...state,
        googleMail: action.data,
        isUpdated: true
      });
    case 'GET_MAIL':
      return ({
        ...state,
        mail: action.data.reverse(),
        isUpdated: true
      });
    case 'READ_GOOGLE_MAIL':
      const googleMail = [];
      state.googleMail.forEach(mail => {
        if (mail.id === action.data) {
          const temp = mail;
          temp.labelIds.splice(temp.labelIds.indexOf('UNREAD'), 1);
          googleMail.push(temp);
        } else {
          googleMail.push(mail);
        }
      });
      return ({
        ...state,
        googleMail
      });
    case 'FILTER_GOOGLE_MAIL':
      const newGoogleMail = JSON.parse(JSON.stringify(state.googleMail));

      state.googleMail.forEach((mail, i) => {
        let from = '';
        let whitelisted = false;

        mail.payload.headers.forEach(header => {
          if (header.name === 'From') {
            from = header.value.split('<')[1].substring(0, header.value.split('<')[1].length - 1)
          }
        });

        action.data.forEach(contact => {
          if (from === contact.email) {
            whitelisted = true;
          }
        });

        if (!whitelisted) {
          newGoogleMail[i] = null;
        }
      });

      return ({
        ...state,
        googleMail: newGoogleMail
      });
    case 'FILTER_MAIL':
      const newMail = JSON.parse(JSON.stringify(state.mail));

      state.mail.forEach((mail, i) => {
        if (mail && mail.body) {
          let whitelisted = false;

          action.data.forEach(contact => {
            if (mail.body.from.value[0].address === contact.email) {
              whitelisted = true;
            }
          });

          if (!whitelisted) {
            newMail[i] = null;
          }
        }
      });

      return ({
        ...state,
        mail: newMail
      });
    default:
      return state;
  }
};

export default mailReducer;