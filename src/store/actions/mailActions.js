import { key } from '../../config/key';

export const compose = mail => (dispatch, getState) => {
  dispatch({ type: 'COMPOSE', mail });
};

export const getMail = () => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8000/get-mail?key=${ key }`);
  const data = await response.json();
  dispatch({ type: 'GET_MAIL', data });
};