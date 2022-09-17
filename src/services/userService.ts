import Mongoose from 'mongoose';
import { logger } from '../loggers/logger';
import { UserUpdateOptions } from '../models/user';
import UserRepo from '../repository/userRepo';
import { Exception } from '../exceptions';

const createUser = async (name: string, age: string, address: string, description: string) => {
  logger.info(`Creating user with name: ${name}`);
  try {
    const user = await UserRepo.createUser({
      name,
      age: parseInt(age),
      address,
      description,
      createdAt: new Date(),
    });
    if (!user) {
      throw new Exception(`Failed to create user with name: ${name}`, 400);
    }
    return user;
  } catch (error) {
    throw new Exception(`Invalid parameters`, 400);
  }
};

const updateUser = async (userId: string, updatedUserFields: UserUpdateOptions) => {
  if (!Mongoose.isValidObjectId(userId)) {
    throw new Exception(`Invalid user id: ${userId}`, 400);
  }
  logger.info(`Updating user with id: ${userId}`);
  const updatedUser = await UserRepo.updateUser(userId, updatedUserFields);
  if (!updatedUser) {
    throw new Exception(`Failed to update user with id: ${userId}`, 404);
  }
  return updatedUser;
};

const getUser = async (userId: string) => {
  if (!Mongoose.isValidObjectId(userId)) {
    throw new Exception(`Invalid user id: ${userId}`, 400);
  }
  logger.info(`Getting user with id: ${userId}`);
  // check if userId is valid mongo id
  const user = await UserRepo.getUser(userId);
  if (!user) {
    throw new Exception(`Failed to get user with id: ${userId}`, 404);
  }
  return user;
};

const getAllUsers = async () => {
  logger.info('Getting all users');
  const users = await UserRepo.getAllUsers();
  if (!users) {
    throw new Exception('Failed to get all users', 404);
  }
  return users;
};

const deleteUser = async (userId: string) => {
  if (!Mongoose.isValidObjectId(userId)) {
    throw new Exception(`Invalid user id: ${userId}`, 400);
  }
  logger.info(`Deleting user with id: ${userId}`);
  const deletedUser = await UserRepo.deleteUser(userId);
  if (!deletedUser) {
    throw new Exception(`Failed to delete user with id: ${userId}`, 404);
  }
  return deletedUser;
};

const UserService = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};

export { UserService as default };
