import React, { useEffect, createContext, useContext, ReactNode, useReducer } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { CLEAR_ALERT, DISPLAY_ALERT, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS } from './actions';
import { ADD_USER, LOGIN } from '../utils/mutations';
import AuthService from '../utils/auth';
import reducer from './reducer';

type initialStateType = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  displayAlert: () => void;
  registerUser: ({ name, email, password }: RegisterUserType) => Promise<void>;
};

type RegisterUserType = {
  name: string;
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

  async function registerUser({ name, email, password }: RegisterUserType) {
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
    } catch (error) {
      console.log(error as ApolloError);
      dispatch({ type: SETUP_USER_ERROR, payload: (error as ApolloError).message });
    }
    clearAlert();
  }

  return <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>{children}</AppContext.Provider>;
}

export { AppProvider, initialState, useAppContext };
