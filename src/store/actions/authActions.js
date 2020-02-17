export const signIn = credentials => async (dispatch, getState) => {
  dispatch({ type: 'SIGN_IN', credentials });
};

export const signUp = credentials => (dispatch, getState) => {
  dispatch({ type: 'SIGN_UP', credentials });
};

export const saveAccessToken = token => ({ type: 'SAVE_ACCESS_TOKEN', token });