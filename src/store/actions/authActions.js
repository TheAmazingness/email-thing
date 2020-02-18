import { key } from '../../config/key.json';
import { uri } from '../../config/server.json';
import CryptoJS from 'crypto-js';

const salt = CryptoJS.lib.WordArray.random(128 / 8);

export const signIn = credentials => async (dispatch, getState) => {
  if (credentials.email.split('@')[1] === 'gmail.com') {
    // const hash = CryptoJS.PBKDF2(credentials.pass, salt, {
    //   keySize: 512 / 32,
    //   iterations: 1000
    // });
    window.location.assign(`${ uri }/auth?provider=google&email=${ credentials.email }&pass=${ credentials.pass }&key=${ key }`);
  }
  dispatch({ type: 'SIGN_IN', credentials });
};

export const signUp = credentials => (dispatch, getState) => {
  if (credentials.email.split('@')[1] === 'gmail.com') {
    // const hash = CryptoJS.PBKDF2(credentials.pass, salt, {
    //   keySize: 512 / 32,
    //   iterations: 1000
    // });
    window.location.href = `${ uri }/auth?provider=google&email=${ credentials.email }&pass=${ credentials.pass }&key=${ key }`;
  }
  dispatch({ type: 'SIGN_UP', credentials });
};

export const saveAccessToken = token => ({ type: 'SAVE_ACCESS_TOKEN', token });