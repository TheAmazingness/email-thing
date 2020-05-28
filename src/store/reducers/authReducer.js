const initState = {
  auth: false,
  isUpdated: false
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_AUTH':
      return ({
        auth: action.data.isAuthed,
        strategy: action.data.strategy,
        isUpdated: true
      });
    default:
      return state;
  }
};

export default authReducer;