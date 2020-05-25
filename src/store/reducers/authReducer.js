const initState = {
  auth: false,
  isUpdated: false
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_AUTH':
      return ({
        auth: action.data,
        isUpdated: true
      });
    default:
      return state;
  }
};

export default authReducer;