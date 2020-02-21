import { key } from '../../config/key.json';
import { uri } from '../../config/server.json';

export const signIn = credentials => async (dispatch, getState) => {
  if (credentials.email.split('@')[1] === 'gmail.com') {
    window.location.assign(`${ uri }/auth?provider=google&email=${ credentials.email }&pass=${ credentials.pass }&key=${ key }`);
  }
  const response = await fetch(`${ uri }/auth?email=${ credentials.email }&pass=${ credentials.pass }&key=${ key }`);
  const data = await response.json();
  if (data.id === null && data.message === 'failed auth') {
    window.location.assign('/signin/failure');
  } else {
    window.location.assign(`/inbox/${ data.id }`);
    dispatch({ type: 'SIGN_IN', credentials });
  }
};

export const signUp = credentials => async (dispatch, getState) => {
  if (credentials.email.split('@')[1] === 'gmail.com') {
    window.location.href = `${ uri }/auth?provider=google&email=${ credentials.email }&pass=${ credentials.pass }&key=${ key }`;
  }
  const response = await fetch(`${ uri }/auth/signup?email=${ credentials.email }&pass=${ credentials.pass }&first=${ credentials.first }&last=${ credentials.last }&key=${ key }`);
  const data = await response.json();
  window.location.assign(`/inbox/${ data.id }`);
  dispatch({ type: 'SIGN_UP', credentials });
};

export const saveAccessToken = token => ({ type: 'SAVE_ACCESS_TOKEN', token });

export const saveId = id => ({ type: 'SAVE_ID', id });