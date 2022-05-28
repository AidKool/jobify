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
    me: async (_: unknown, __: unknown, context: { user: { _id: ObjectId } }) => {
      try {
        if (context.user) {
          return await User.findById(context.user._id);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getAllUsers: async () => {
      try {
        return User.find();
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getUserById: async (_: unknown, { _id }: { _id: ObjectId }) => {
      try {
        return User.findById(_id);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    addUser: async (_: unknown, { name, email, password }: AuthUserType) => {
      try {
        const user = await User.create({ name, email, password });
        user.password = null;
        const token = signToken(user);
        return { token, user };
      } catch (error: any) {
        throw new Error(error);
      }
    },

    login: async (_: unknown, { email, password }: AuthUserType) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }

        const correctPassword = await user.isCorrectPassword(password);

        if (!correctPassword) {
          throw new AuthenticationError('Invalid credentials');
        }

        user.password = null;
        const token = signToken(user);
        return { token, user };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
