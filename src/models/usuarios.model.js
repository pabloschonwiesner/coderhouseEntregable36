const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const AutoIncrement = require('mongoose-sequence')(mongoose)

let Schema = mongoose.Schema

let usuarioSchema = new Schema({
  usuario: String,
  password: String,
  nombre: String,
  direccion: String,
  edad: Number,
  telefono: String,
  foto: String,
  email: String
}, { timestamps: true })

usuarioSchema.pre( 'save', async function(next) {
  const user = this
  const hash = await bcrypt.hash(user.password, 10)

  this.password = hash
  next()
})

usuarioSchema.methods.isValidPassword = async function(password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

usuarioSchema.plugin(AutoIncrement, { inc_field: 'id_usuario'})
module.exports = mongoose.model('Usuario', usuarioSchema)