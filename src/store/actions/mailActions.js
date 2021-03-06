import { uri } from '../../config/server.json';
import { get, postBody } from '../../helper/fetch';

export const getGoogleMail = () => async (dispatch, getState) => {
  const state = getState();
  if (!state.mail.isUpdated) {
    const response = await get(`${ uri }/get-mail/google`);
    const data = await response.json();
    dispatch({ type: 'GET_GOOGLE_MAIL', data });
  }
};

export const getMail = () => async (dispatch, getState) => {
  const state = getState();
  if (!state.mail.isUpdated) {
    const response = await get(`${ uri }/get-mail`);
    const data = await response.json();
    dispatch({ type: 'GET_MAIL', data });
  }
};

export const readGoogleMail = id => async dispatch => {
  await postBody(`${ uri }/get-mail/google/read-one`, { id });
  dispatch({ type: 'READ_GOOGLE_MAIL', data: id });
};

export const filterGoogleMail = () => (dispatch, getState) => {
  const state = getState();
  if (state.mail.googleMail.length > 0) {
    dispatch({ type: 'FILTER_GOOGLE_MAIL', data: state.settings.settings.contacts });
  }
};

export const filterMail = () => (dispatch, getState) => {
  const state = getState();
  if (state.mail.mail.length > 0) {
    dispatch({ type: 'FILTER_MAIL', data: state.settings.settings.contacts });
  }
};