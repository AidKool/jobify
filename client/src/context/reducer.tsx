import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';

type StateType = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
};

type ActionType = {
  type: string;
};

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case DISPLAY_ALERT:
      return { ...state, alertType: 'error', alertText: 'Please provide all values', showAlert: true };
    case CLEAR_ALERT:
      return { ...state, alertType: '', alertText: '', showAlert: false };
    default:
      return state;
  }
}

export default reducer;
