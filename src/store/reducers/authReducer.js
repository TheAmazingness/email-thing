const initState = {
  accessToken: window.localStorage.getItem('accessToken') ? window.localStorage.getItem('accessToken') : null,
  id: window.localStorage.getItem('id') ? window.localStorage.getItem('id') : null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SAVE_ACCESS_TOKEN':
      window.localStorage.setItem('accessToken', action.token);
      return ({
        ...state,
        accessToken: action.token
      });
    case 'SAVE_ID':
      window.localStorage.setItem('id', action.id);
      return ({
        ...state,
        id: action.id
      });
  }
  return state;
};

export default authReducer;