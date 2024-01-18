import { Router } from 'express';
import { loginUser, getCurrentSessionUser, logoutUser } from '../../controllers/sessions.controllers.js';


export const sessionsRouter = Router();


sessionsRouter.post('/', loginUser);
sessionsRouter.get('/current', getCurrentSessionUser);
sessionsRouter.delete('/current',logoutUser);