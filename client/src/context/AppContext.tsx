import React, { useEffect, createContext, useContext, ReactNode, useReducer } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
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
    }, 3000);
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
      dispatch({ type: SETUP_USER_ERROR, payload: error.message });
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
  }

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser }}>{children}</AppContext.Provider>
  );
}

export { AppProvider, initialState, useAppContext };
