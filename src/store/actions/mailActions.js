import { uri } from '../../config/server.json';
import { get } from '../../helper/fetch';

export const getGoogleMail = id => async dispatch => {
  const response = await get(`${ uri }/get-mail/google`, { token: id });
  const data = await response.json();
  dispatch({ type: 'GET_GOOGLE_MAIL', data });
};

export const getMail = id => async dispatch => {
  const response = await get(`${ uri }/get-mail`, { id });
  const data = await response.json();
  dispatch({ type: 'GET_MAIL', data });
};