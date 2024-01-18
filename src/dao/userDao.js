import { usersManager } from '../models/User.js';

export class UserDAO {

  static createUser = async (userData) => {
    try {
      return await usersManager.register(userData);
    } catch (error) {
      throw new Error('Error creating user');
    }
  };

  static findUserByUsername = async ({username, password}) => {
    try {
      return await usersManager.login({ username, password });
    } catch (error) {
      throw new Error('Error finding user by username');
    }
  };

  static findAllUsers = async () => {
    try {
      return await usersManager.find({}, { password: 0 }).lean();
    } catch (error) {
      throw new Error('Error finding user by username');
    }
  };

}
