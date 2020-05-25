import { uri } from '../../config/server.json';
import { get } from '../../helper/fetch';

export const getGoogleMail = () => async dispatch => {
  const response = await get(`${ uri }/get-mail/google`);
  const data = await response.json();
  dispatch({ type: 'GET_GOOGLE_MAIL', data });
};

export const getMail = () => async dispatch => {
  const response = await get(`${ uri }/get-mail`,);
  const data = await response.json();
  dispatch({ type: 'GET_MAIL', data });
};