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

  type Query {
    getAllUsers: [User]
    getUserById(_id: ID): User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
  }
`;

export default typeDefs;
