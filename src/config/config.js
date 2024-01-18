import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT 
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR 
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY 
export const COOKIE_SECRET = process.env.COOKIE_SECRET 