const initialState = {
  mail: [{ id: 1, body: 'hello world' }]
};

const mailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPOSE':
      console.log('composed email:', action.mail);
      break;
  }
  return state;
};

export default mailReducer;