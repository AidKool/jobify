import { ObjectId } from 'mongoose';
import { User } from '../models';

type AddUserType = {
  name: string;
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
    addUser: async (_: unknown, { name, email, password }: AddUserType) => {
      try {
        return await User.create({ name, email, password });
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
