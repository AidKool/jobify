import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from './actions';

import { initialState } from './AppContext';

type StateType = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  showSidebar: boolean;
};

type ActionType = {
  type: string;
  payload: string;
};

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case DISPLAY_ALERT:
      return { ...state, alertType: 'error', alertText: 'Please provide all values', showAlert: true };
    case CLEAR_ALERT:
      return { ...state, alertType: '', alertText: '', showAlert: false };
    case SETUP_USER_BEGIN:
      return { ...state, isLoading: true };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'User created successfully',
      };
    case SETUP_USER_ERROR:
      return { ...state, isLoading: false, showAlert: true, alertType: 'error', alertText: action.payload };
    case LOGIN_USER_BEGIN:
      return { ...state, isLoading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'User logged in successfully',
      };
    case LOGIN_USER_ERROR:
      return { ...state, isLoading: false, showAlert: true, alertType: 'error', alertText: action.payload };
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case LOGOUT_USER:
      return { ...initialState };
    default:
      return state;
  }
}

export default reducer;
