const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose');
const productos = require('./routes/productos')
const carritos = require('./routes/carritos')
const app = express()

if(process.env.NODE_ENV == undefined) {
  process.env.NODE_ENV = 'development'
}

dotenv.config({
  path: path.resolve(__dirname, '..', process.env.NODE_ENV  + '.env')
})
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use('/productos', productos)
app.use('/carritos', carritos)

mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))