import { key } from '../../config/key.json';
import { uri } from '../../config/server.json';

export const compose = mail => (dispatch, getState) => {
  dispatch({ type: 'COMPOSE', mail });
};

export const getGoogleMail = id => async dispatch => {
  const response = await fetch(`${ uri }/get-mail/google?token=${ id }&key=${ key }`);
  const data = await response.json();
  dispatch({ type: 'GET_GOOGLE_MAIL', data });
};

export const getMail = id => async dispatch => {
  const response = await fetch(`${ uri }/get-mail?id=${ id }&key=${ key }`);
  const data = await response.json();
  dispatch({ type: 'GET_MAIL', data });
};