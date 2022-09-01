import mongoose from 'mongoose';

export interface User {
  _id?: string;
  name: string;
  dob: string;
  address: string;
  description: string;
  createdAt: Date;
}

export interface UserUpdateOptions {
  name?: string;
  dob?: string;
  address?: string;
  description?: string;
}

const userSchema = new mongoose.Schema({
  name: String,
  dob: String,
  address: String,
  description: String,
  createdAt: Date,
});

export const UserModel = mongoose.model<User>('user', userSchema);
