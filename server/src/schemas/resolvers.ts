import { AuthenticationError } from 'apollo-server-express';
import { ObjectId } from 'mongoose';
import { Job, User } from '../models';
import { signToken } from '../utils/auth';

type UserType = {
  name?: string;
  lastName?: string;
  email: string;
  location?: string;
  password: string;
};

type AddJobType = {
  company: string;
  position: string;
  location: string;
  status: string;
  type: string;
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
    getAllJobs: async (_: unknown, __: unknown, context: { user: { _id: ObjectId } }) => {
      try {
        if (context.user) {
          return await Job.find({ createdBy: context.user._id });
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    addUser: async (_: unknown, { name, email, password }: UserType) => {
      try {
        const user = await User.create({ name, email, password });
        user.password = null;
        const token = signToken(user);
        return { token, user };
      } catch (error: any) {
        throw new Error(error);
      }
    },
    updateUser: async (
      _: unknown,
      { name, lastName, email, location }: UserType,
      context: { user: { _id: ObjectId } }
    ) => {
      try {
        if (context.user._id) {
          const user = await User.findByIdAndUpdate(
            context.user._id,
            {
              name,
              lastName,
              email,
              location,
            },
            {
              new: true,
              runValidators: true,
            }
          );
          user.password = null;
          const token = signToken(user);
          return { token, user };
        }
      } catch (error: any) {
        throw new Error(error);
      }
    },
    login: async (_: unknown, { email, password }: UserType) => {
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
    addJob: async (
      _: unknown,
      { company, position, location, status, type }: AddJobType,
      context: { user: { _id: ObjectId } }
    ) => {
      try {
        if (context.user._id) {
          const job = await Job.create({ company, position, location, status, type, createdBy: context.user._id });
          return job;
        } else {
          throw new AuthenticationError('User not logged in');
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
