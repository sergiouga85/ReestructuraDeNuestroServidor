import { usersOnly } from '../middlewares/authorization.js';
import { appendJwtAsCookie, removeJwtFromCookies } from '../controllers/authentication.business.js';
import passport from 'passport';


export const loginUser = async (req, res, next) => {
    try {
    passport.authenticate('localLogin', {
        failWithError: true,
        session: false
      }),
      appendJwtAsCookie,
    res['successfullPost'](req.user);
    } catch (error) {
        next(error);
    }
};

  
export const getCurrentSessionUser = async (req, res, next) => {
    try {
    passport.authenticate('jwtAuth', {
        session: false
      }),
      usersOnly,
    res['successfullGet'](req.user);
    } catch (error) {
        next(error);
    }
};
  
export const logoutUser = async (req, res, next) => {
    try {
    removeJwtFromCookies,
    res['successfullDelete']();
    } catch (error) {
        next(error);
    }
};