import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'
import { hasheadasSonIguales, hashear } from '../utils/criptografia.js'

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
  statics: {
    register: async (userData) => {
      userData.password = hashear(userData.password)
      const user = await model('users').create(userData)
      console.log(user.toObject())
      return user.toObject()
    },
    login: async ({ username, password }) => {
      const user = await model('users').findOne({ username })
      if (!user) { throw new Error('authentication error') }
      if (!hasheadasSonIguales({
        recibida: password,
        almacenada: user.password
      })) {
        throw new Error('authentication error')
      }
      return user.toObject()
    },

  }
})

export const usersManager = model('users', schema)