import { uri } from '../../config/server.json';
import { get } from '../../helper/fetch';

export const getAuth = () => async (dispatch, getState) => {
  const state = getState();
  if (!state.isUpdated) {
    const response = await get(`${ uri }/auth/is-authed`);
    const data = await response.json();
    dispatch({ type: 'GET_AUTH', data });
  }
};