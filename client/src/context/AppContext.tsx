import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import { useMutation } from '@apollo/client';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
} from './actions';
import { ADD_USER, LOGIN } from '../utils/mutations';
import AuthService from '../utils/auth';
import reducer from './reducer';

type initialStateType = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  displayAlert: () => void;
  registerUser: ({ name, email, password }: AuthUserType) => Promise<void>;
  loginUser: ({ email, password }: AuthUserType) => Promise<void>;
  logoutUser: () => void;
  toggleSidebar: () => void;
};

type AuthUserType = {
  name?: string;
  email: string;
  password: string;
};

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  showSidebar: false,
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
  const [login] = useMutation(LOGIN);
  const [addUser] = useMutation(ADD_USER);

  function displayAlert() {
    dispatch({ type: DISPLAY_ALERT, payload: '' });
    clearAlert();
  }

  function clearAlert() {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT, payload: '' });
    }, 5000);
  }

  async function registerUser({ name, email, password }: AuthUserType) {
    dispatch({ type: SETUP_USER_BEGIN, payload: '' });
    try {
      const { data } = await addUser({
        variables: {
          name,
          email,
          password,
        },
      });
      dispatch({ type: SETUP_USER_SUCCESS, payload: '' });
      AuthService.login(data.addUser.token);
    } catch (error: any) {
      let msg = '';
      if (error.message.includes('email')) {
        msg = 'Email address already in use';
      } else if (error.message.includes('name')) {
        msg = 'Choose a valid name of 3 characters of more';
      } else if (error.message.includes('password')) {
        msg = 'Choose a valid password of 6 characters of more';
      } else {
        msg = 'There was an error\nTry again later';
      }
      dispatch({ type: SETUP_USER_ERROR, payload: msg });
    }
    clearAlert();
  }

  async function loginUser({ email, password }: AuthUserType) {
    dispatch({ type: LOGIN_USER_BEGIN, payload: '' });
    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      dispatch({ type: LOGIN_USER_SUCCESS, payload: '' });
      AuthService.login(data.login.token);
    } catch (error: any) {
      dispatch({ type: LOGIN_USER_ERROR, payload: error.message });
    }
    clearAlert();
  }

  function logoutUser() {
    dispatch({ type: LOGOUT_USER, payload: '' });
    localStorage.clear();
  }

  function toggleSidebar() {
    dispatch({ type: TOGGLE_SIDEBAR, payload: '' });
  }

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser, logoutUser, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, initialState, useAppContext };
