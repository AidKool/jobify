import React, { useEffect, createContext, useContext, ReactNode, useReducer } from 'react';
import { CLEAR_ALERT, DISPLAY_ALERT } from './actions';
import reducer from './reducer';

type initialStateType = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  displayAlert: () => void;
};

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

const AppContext = createContext({} as initialStateType);

function useAppContext() {
  return useContext(AppContext);
}

type AppProviderTypeProps = {
  children: ReactNode;
};

function AppProvider({ children }: AppProviderTypeProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function displayAlert() {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  }

  function clearAlert() {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  }

  return <AppContext.Provider value={{ ...state, displayAlert }}>{children}</AppContext.Provider>;
}

export { AppProvider, initialState, useAppContext };
