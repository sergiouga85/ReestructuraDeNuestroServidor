import { usersManager } from '../models/User.js';

import { hasheadasSonIguales, hashear } from '../utils/criptografia.js'

export class UserDAO {

  static createUser = async (userData) => {
    try {
      userData.password = hashear(userData.password)
      const user = await usersManager.create(userData)
      return user.toObject()
    } catch (error) {
      throw new Error('Error creating user');
    }
  };

  static findUserByUsername = async ({username, password}) => {
    try {
        const user = await usersManager.findOne({ username })
        if (!user) { throw new Error('authentication error') }
        if (!hasheadasSonIguales({
          recibida: password,
          almacenada: user.password
        })) {
          throw new Error('authentication error')
        }
        return user.toObject() 
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
