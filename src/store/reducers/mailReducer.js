const initState = {
  mail: []
};

const mailReducer = (state = initState, action) => {
  switch (action.type) {
    case 'COMPOSE':
      console.log('composed email:', action.mail);
      break;
    case 'SET_EMAIL':
      return ({
        ...state,
        email: action.email
      });
    case 'GET_MAIL':
      return ({
        ...state,
        mail: action.data
      });
  }
  return state;
};

export default mailReducer;