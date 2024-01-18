import { authorizeUser, authorizeAdmin } from '../controllers/authorization.controllers.js';

export const usersOnly = authorizeUser;
export const adminsOnly = authorizeAdmin;