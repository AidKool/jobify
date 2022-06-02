import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        lastName
        email
        location
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($name: String!, $lastName: String!, $email: String!, $location: String!) {
    updateUser(name: $name, lastName: $lastName, email: $email, location: $location) {
      token
      user {
        _id
        name
        lastName
        email
        location
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        lastName
        email
        location
      }
    }
  }
`;
