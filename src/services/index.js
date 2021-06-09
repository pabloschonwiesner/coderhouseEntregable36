const express = require('express')
const session = require('express-session')
const dotenv = require('dotenv')
const path = require('path')
const MongoStore = require('connect-mongo')


const productos = require('../routes/productos')
const carritos = require('../routes/carritos')
const usuarios = require('../routes/usuarios')
const archivos = require('../routes/archivos')
const { passport } = require('../middlewares/auth')

const app = express()

let arrObj = []

process.argv.forEach( arg => {
  let arrArg = arg.split('=')
  arrObj.push({ clave: arrArg[0], valor: arrArg[1]})
})

dotenv.config({
  path: path.resolve(__dirname, '..', process.env.NODE_ENV  + '.env')
})

if(process.env.NODE_ENV == undefined) {
  process.env.NODE_ENV = 'development'
}

app.use(session({
  secret: 'clavesecreta',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/ecommerce'}),
  cookie: {
    maxAge: 600000
  }
}))

app.use(passport.initialize());
// app.use(passport.session());

app.use('/archivos', express.static(path.join(__dirname, '/archivos')))

app.use(express.json())
app.use('/productos', productos)
app.use('/carritos', carritos)
app.use('/usuarios', usuarios)
app.use('/archivos', archivos)



module.exports = app