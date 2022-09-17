import mongoose from 'mongoose';

export interface User {
  _id?: string;
  name: string;
  age: number;
  address: string;
  description: string;
  createdAt: Date;
}

export interface UserUpdateOptions {
  name?: string;
  age?: number;
  address?: string;
  description?: string;
}

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  address: String,
  description: String,
  createdAt: Date,
});

export const UserModel = mongoose.model<User>('user', userSchema);
