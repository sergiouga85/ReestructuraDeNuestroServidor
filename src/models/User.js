import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'
import {hashear } from '../utils/criptografia.js'

const schema = new Schema({
  _id: { type: String, default: randomUUID },
  first_name:{ type: String, required: true },
  last_name:{ type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: String, required: true },
  password: { type: String, required: true },
  cart: { type: String, unique: true, required: true },
  rol: { type: String, default: 'user' },
  
}, {
  versionKey: false,
  strict: 'throw',
})

export const usersManager = model('users', schema)