export const compose = mail => (dispatch, getState) => {
  dispatch({ type: 'COMPOSE', mail });
};

export const getMail = mail => (dispatch, getState) => {
  dispatch({ type: 'GET_MAIL', mail });
};