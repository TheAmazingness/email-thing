import { key } from '../../config/key.json';
import { uri } from '../../config/server.json';

export const signIn = credentials => async (dispatch, getState) => {
  if (credentials.email.split('@')[1] === 'gmail.com') {
    window.location.assign(`${ uri }/auth?provider=google&email=${ credentials.email }&pass=${ credentials.pass }&key=${ key }`);
  }
  dispatch({ type: 'SIGN_IN', credentials });
};

export const signUp = credentials => (dispatch, getState) => {
  if (credentials.email.split('@')[1] === 'gmail.com') {
    window.location.href = `${ uri }/auth?provider=google&email=${ credentials.email }&pass=${ credentials.pass }&key=${ key }`;
  }
  dispatch({ type: 'SIGN_UP', credentials });
};

export const saveAccessToken = token => ({ type: 'SAVE_ACCESS_TOKEN', token });

export const saveId = id => ({ type: 'SAVE_ID', id });