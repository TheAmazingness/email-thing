const initState = {
  accessToken: window.localStorage.getItem('accessToken') ? window.localStorage.getItem('accessToken') : null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SAVE_ACCESS_TOKEN':
      window.localStorage.setItem('accessToken', action.token);
      return ({
        ...state,
        accessToken: action.token
      });
  }
  return state;
};

export default authReducer;