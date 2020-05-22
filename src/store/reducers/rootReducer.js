import mailReducer from './mailReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ mail: mailReducer });

export default rootReducer;