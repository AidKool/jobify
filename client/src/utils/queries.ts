import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  query getAllUsers() {
    getAllUsers {
      _id
      name
      lastName
      email
      location
    }
  }
`;

export const QUERY_USER_BY_ID = gql`
  query getUserById($id: ID) {
    getUserById {
      _id
      name
      lastName
      email
      location
    }
  }
`;
