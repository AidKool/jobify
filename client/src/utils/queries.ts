import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      _id
      name
      lastName
      email
      password
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

export const QUERY_LOGGED_IN_USER = gql`
  query me {
    me {
      _id
      name
      lastName
      email
      location
    }
  }
`;

export const GET_ALL_JOBS = gql`
  query getAllJobs {
    getAllJobs {
      _id
      company
      position
      status
      type
      location
    }
  }
`;

export const GET_JOB_BY_ID = gql`
  query getJobById($id: ID) {
    getJobById(_id: $id) {
      _id
      company
      position
      status
      type
      location
    }
  }
`;
