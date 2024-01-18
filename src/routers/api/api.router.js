import { Router, json, urlencoded } from 'express'
import { usersRouter } from './users.router.js'
import { metodosPersonalizados } from '../../middlewares/metodosPersonalizados.js'
import { sessionsRouter } from './sessions.router.js'
import { errorHandler } from '../../middlewares/errorHandler.js'
import { carritoRouter } from './carrito.router.js'
import {productosRouter} from './productos.router.js'

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended:true}))

apiRouter.use(metodosPersonalizados)

apiRouter.use('/users', usersRouter)
apiRouter.use('/sessions', sessionsRouter)
apiRouter.use('/productos', productosRouter)
apiRouter.use('/carritos', carritoRouter)

apiRouter.use(errorHandler)