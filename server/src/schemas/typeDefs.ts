import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    lastName: String
    email: String
    password: String
    location: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Job {
    _id: ID
    company: String
    position: String
    status: String
    type: String
    location: String
    createdBy: User
  }

  type Query {
    me: User
    getAllUsers: [User]
    getUserById(_id: ID): User
    getAllJobs: [Job]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(name: String!, email: String!, password: String!): Auth
    updateUser(name: String!, lastName: String!, email: String!, location: String!): Auth
    addJob(company: String!, position: String!, location: String!): Job
  }
`;

export default typeDefs;
