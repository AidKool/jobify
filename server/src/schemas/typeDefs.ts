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

  type Query {
    me: User
    getAllUsers: [User]
    getUserById(_id: ID): User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
