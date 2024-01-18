import { Schema, model } from 'mongoose'

const schema = new Schema({
  _id: { type: String},
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