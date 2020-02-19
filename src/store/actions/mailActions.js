import { key } from '../../config/key';

export const compose = mail => (dispatch, getState) => {
  dispatch({ type: 'COMPOSE', mail });
};

export const getMail = id => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8000/get-mail/google?token=${ id }&key=${ key }`);
  const data = await response.json();
  dispatch({ type: 'GET_MAIL', data });
};