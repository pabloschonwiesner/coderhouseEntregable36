const Usuario = require('./../models/usuarios.model')

class UsuariosRepository {

  async addUsuario ( usuario ) {
    try {
      let nuevoUsuario = new Usuario({
        usuario: usuario.usuario,
        password: usuario.password,
        nombre: usuario.nombre,
        direccion: usuario.direccion,
        edad: usuario.edad,
        telefono: usuario.telefono,
        foto: usuario.foto,
        email: usuario.email
      })
      return await nuevoUsuario.save()
    } catch ( err ) { throw err }
  }

  async getUsuarios ( id_usuario ) {
    try {
      if( id_usuario ) {
        let usuario = await Usuario.find( { id_usuario })
        if(usuario.length == 0) {
          return undefined
        }
        return usuario
      } else {
        let usuarios = await Usuario.find()
        return usuarios

      }
    } catch ( err ) { throw err }
  }

  async getUsuarioByUsername ( usuario ) {
    try {
      return await Usuario.find( { usuario })        
    } catch ( err ) { throw err }
  }
  
  async getUsuarioById ( id ) {
    try {
      return await Usuario.findById(id)        
    } catch ( err ) { throw err }
  }

}

module.exports = UsuariosRepository