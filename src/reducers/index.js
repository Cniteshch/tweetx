import {
  combineReducers
} from 'redux';
import VotingReducer from './users';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  user: VotingReducer,
  auth : AuthReducer
});

export default rootReducer;