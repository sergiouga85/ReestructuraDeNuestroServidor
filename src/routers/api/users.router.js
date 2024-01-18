import { Router } from 'express';
import { appendJwtAsCookie } from '../../controllers/authentication.business.js';
import { adminsOnly, usersOnly } from '../../middlewares/authorization.js';
import passport from 'passport';
import { registerUser, getCurrentUser, getAllUsers} from '../../controllers/users.controllers.js';

export const usersRouter = Router();

usersRouter.post(
  '/',
  passport.authenticate('localRegister', {
    failWithError: true,
    session: false,
  }),
  appendJwtAsCookie,
  registerUser
);

usersRouter.get(
  '/current',
  passport.authenticate('jwtAuth', {
    failWithError: true,
    session: false,
  }),
  usersOnly,
  getCurrentUser
);

usersRouter.get(
  '/',
  passport.authenticate('jwtAuth', {
    failWithError: true,
    session: false,
  }),
  adminsOnly,
  getAllUsers
);


