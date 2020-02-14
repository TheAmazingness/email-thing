import { key } from '../../config/key.json';

export const signIn = credentials => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8000/request-auth?email=${ credentials.email }&pass=${ credentials.pass }&key=${ key }`)
  const data = await response.json();
  console.log(data);
  // dispatch({ type: 'SIGN_IN', credentials });
};

export const signUp = credentials => (dispatch, getState) => {
  dispatch({ type: 'SIGN_UP', credentials });
};