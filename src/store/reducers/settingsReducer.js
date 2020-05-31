const initState = {
  settings: {
    tts: false,
    large: false,
    dyslexia: false,
    whitelist: [],
    help: '',
    contacts: [],
    voicemail: false
  },
  isUpdated: false
};

const settingsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_SETTINGS':
      return ({
        settings: action.data,
        isUpdated: true
      });
    case 'SET_SETTINGS':
      return ({
        ...state.settings,
        settings: {
          ...state.settings,
          ...action.data
        }
      });
    default:
      return state;
  }
};

export default settingsReducer;