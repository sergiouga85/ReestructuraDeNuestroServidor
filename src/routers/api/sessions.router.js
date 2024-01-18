import { Router } from 'express';
import { appendJwtAsCookie, removeJwtFromCookies } from '../../controllers/authentication.business.js';
import { loginUser, getCurrentSessionUser, logoutUser } from '../../controllers/sessions.controllers.js';
import { usersOnly } from '../../middlewares/authorization.js';
import passport from 'passport';


export const sessionsRouter = Router();

// login
sessionsRouter.post('/',
  passport.authenticate('localLogin', {
    failWithError: true,
    session: false
  }),
  appendJwtAsCookie,
  loginUser
);

// view
sessionsRouter.get('/current',
  passport.authenticate('jwtAuth', {
    session: false
  }),
  usersOnly,
  getCurrentSessionUser
);

// logout
sessionsRouter.delete('/current',
  removeJwtFromCookies,
  logoutUser
);