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
        console.log(mail);
        // let whitelisted = false;
        //
        // action.data.forEach(contact => {
        //   if (mail.body.from.value[0].address === contact.email) {
        //     whitelisted = true;
        //   }
        // });
        //
        // if (!whitelisted) {
        //   newMail[i] = null;
        // }
      });

      return ({
        ...state,
        mail: newGoogleMail
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