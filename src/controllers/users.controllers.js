import {UserDAO} from '../dao/userDao.js'

export const registerUser = async (req, res, next) => {
    try {
      res['successfullPost'](req.user);
    } catch (error) {
      next(error);
    }
};
  
export const getCurrentUser = async (req, res, next) => {
  try {
    res['successfullGet'](req.user);
  } catch (error) {
    next(error);
  }
};
  
export const getAllUsers = async (req, res, next) => {
    try {
      const usuarios = await UserDAO.findAllUsers()
      res['successfullGet'](usuarios);
    } catch (error) {
      next(error);
    }
};
