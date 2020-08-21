import authReducer from './authReducer';
import mailReducer from './mailReducer';
import settingsReducer from './settingsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  mail: mailReducer,
  settings: settingsReducer
});

export default rootReducer;