import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/', (req, res) => { return res.redirect('/login') })

webRouter.get('/register', (req, res) => {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})

webRouter.get('/profile', (req, res) => {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: req.user,
  })
})

webRouter.get('/login', (req, res) => {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})

webRouter.get('/productos', (req, res) => {
  res.render('productos.handlebars',{ titulo: 'Productos' })
})

webRouter.get('/carritos', (req, res) => {
  res.render('carritos.handlebars',{ titulo: 'carritos' })
})

webRouter.get('/carritosActivos', (req, res) => {
  res.render('carritosActivos.handlebars',{ titulo: 'Elegir Carritos' })
})