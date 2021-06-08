const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

let Schema = mongoose.Schema

let productoSchema = new Schema({
  nombre: String,
  descripcion: String,
  codigo: String,
  foto: String,
  precio: Number,
  stock: Number 
}, { timestamps: true })

productoSchema.plugin(AutoIncrement, { inc_field: 'id_producto'})
module.exports = mongoose.model('Producto', productoSchema)