const initState = {
  googleMail: [],
  mail: []
};

const mailReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_GOOGLE_MAIL':
      return ({
        ...state,
        googleMail: action.data
      });
    case 'GET_MAIL':
      return ({
        ...state,
        mail: action.data
      });
    default:
      return state;
  }
};

export default mailReducer;