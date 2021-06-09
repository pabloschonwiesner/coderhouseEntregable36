const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

let Schema = mongoose.Schema

let carritoSchema = new Schema({
  productos: Array,
  id_usuario: String,
}, { timestamps: true})

carritoSchema.plugin(AutoIncrement, { inc_field: 'id_carrito'})
module.exports = mongoose.model('Carrito', carritoSchema)