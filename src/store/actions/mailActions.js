export const compose = mail => (dispatch, getState) => {
  dispatch({ type: 'COMPOSE', mail })
};