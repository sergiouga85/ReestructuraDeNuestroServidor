import { encriptar } from '../utils/criptografia.js';
import {UserDAO} from '../dao/userDao.js'

const COOKIE_OPTS = { signed: true, maxAge: 1000 * 60 * 60, httpOnly: true }

export async function registerUser(req, _username, _password, done) {
  try {
    const user = await UserDAO.createUser(req.body);
    done(null, user);
    console.log(user)
  } catch (error) {
    done(error);
  }
}

export async function loginUser(username, password, done) {
  try {
    const user = await UserDAO.findUserByUsername({ username, password });
    done(null, user);
  } catch (error) {
    done(error);
  }
}

export async function jwtAuthentication(user, done) {
  done(null, user);
}

export async function appendJwtAsCookie(req, res, next) {
  try {
    const jwt = await encriptar(req.user);
    res.cookie('authorization', jwt, COOKIE_OPTS);
    next();
  } catch (error) {
    next(error);
  }
}

export async function removeJwtFromCookies(req, res, next) {
  res.clearCookie('authorization', COOKIE_OPTS);
  next();
}