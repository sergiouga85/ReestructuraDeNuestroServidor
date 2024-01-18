import { Router } from 'express';
import { registerUser, getCurrentUser, getAllUsers} from '../../controllers/users.controllers.js';

export const usersRouter = Router();

usersRouter.post('/',registerUser);
usersRouter.get('/current',getCurrentUser);
usersRouter.get('/',getAllUsers); 


