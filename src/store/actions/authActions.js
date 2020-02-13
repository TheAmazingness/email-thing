export const signIn = credentials => (dispatch, getState) => {
  dispatch({ type: 'SIGN_IN', credentials });
};

export const signUp = credentials => (dispatch, getState) => {
  dispatch({ type: 'SIGN_UP', credentials });
};