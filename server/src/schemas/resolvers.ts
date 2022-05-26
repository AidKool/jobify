import { AuthenticationError } from 'apollo-server-express';
import { ObjectId } from 'mongoose';
import { User } from '../models';
import { signToken } from '../utils/auth';

type AuthUserType = {
  name?: string;
  email: string;
  password: string;
};

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return User.find();
    },
    getUserById: async (_: unknown, { _id }: { _id: ObjectId }) => {
      return User.findById(_id);
    },
  },
  Mutation: {
    addUser: async (_: unknown, { name, email, password }: AuthUserType) => {
      try {
        return await User.create({ name, email, password });
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    login: async (_: unknown, { email, password }: AuthUserType) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

export default resolvers;
