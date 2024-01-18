import {UserDAO} from '../dao/userDao.js'
import { appendJwtAsCookie } from '../controllers/authentication.business.js';
import { adminsOnly, usersOnly } from '../middlewares/authorization.js';
import passport from 'passport';

export const registerUser = async (req, res, next) => {
  try {
    passport.authenticate('localRegister', {
      failWithError: true,
      session: false,
    }),
    appendJwtAsCookie,
    res['successfullPost'](req.user);
  } catch (error) {
      next(error);
  }
}
  
export const getCurrentUser = async (req, res, next) => {
  try {
    passport.authenticate('jwtAuth', {
      failWithError: true,
      session: false,
    }),
    usersOnly,
    res['successfullGet'](req.user);
  } catch (error) {
    next(error);
  }
}
  
export const getAllUsers = async (req, res, next) => {
    try {
      passport.authenticate('jwtAuth', {
        failWithError: true,
        session: false,
      }),
      adminsOnly
      const usuarios = await UserDAO.findAllUsers()
      res['successfullGet'](usuarios);
    } catch (error) {
      next(error);
    }
};
