import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, PROTECTED_TEST } from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  content: '',
  authenticated: false
};

export default function ( state = INITIAL_STATE, action ) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        message: '',
        authenticated: true,
        businessAuthenticated: false
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        businessAuthenticated: false,
        type: '',
        error: action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.error ? action.payload.error : 'Invalid Credentials'
      };

    case PROTECTED_TEST:
      return {
        ...state,
        content: action.payload.message
      };
      default:
  }

  return state;
}
