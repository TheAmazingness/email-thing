import authReducer from './authReducer';
import mailReducer from './mailReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  mail: mailReducer
});

export default rootReducer;