import { logger } from '../loggers/logger';
import { UserUpdateOptions } from '../models/user';
import UserRepo from '../repository/userRepo';

const createUser = async (name: string, dob: string, address: string, description: string) => {
  logger.info(`Creating user with name: ${name}`);
  const newUser = await UserRepo.createUser({
    name,
    dob,
    address,
    description,
    createdAt: new Date(),
  });
  if (!newUser) {
    throw new Error(`Failed to create user with name: ${name}`);
  }
  return newUser;
};

const updateUser = async (userId: string, updatedUserFields: UserUpdateOptions) => {
  logger.info(`Updating user with id: ${userId}`);
  const updatedUser = await UserRepo.updateUser(userId, updatedUserFields);
  if (!updatedUser) {
    throw new Error(`Failed to update user with id: ${userId}`);
  }
  return updatedUser;
};

const getUser = async (userId: string) => {
  logger.info(`Getting user with id: ${userId}`);
  const user = await UserRepo.getUser(userId);
  if (!user) {
    throw new Error(`Failed to get user with id: ${userId}`);
  }
  return user;
};

const deleteUser = async (userId: string) => {
  logger.info(`Deleting user with id: ${userId}`);
  const deletedUser = await UserRepo.deleteUser(userId);
  if (!deletedUser) {
    throw new Error(`Failed to delete user with id: ${userId}`);
  }
  return deletedUser;
};

const UserService = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};

export { UserService as default };
