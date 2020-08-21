import { uri } from '../../config/server.json';
import { get, postBody } from '../../helper/fetch';

export const getSettings = () => async (dispatch, getState) => {
  const state = getState();
  if (!state.settings.isUpdated) {
    const response = await get(`${ uri }/settings`);
    const data = await response.json();
    dispatch({ type: 'GET_SETTINGS', data });
  }
};

export const setSettings = setting => async dispatch => {
  await postBody(`${ uri }/settings`, setting);
  dispatch({ type: 'SET_SETTINGS', data: setting });
};