const UsuariosRepository= require('./../repositories/usuarios.repository')
const usuariosRepository = new UsuariosRepository();

class UsuariosService {
  
  async addUsuario ( usuario ) {
    try {
      let usuarioAgregado = await usuariosRepository.addUsuario( usuario )
      return usuarioAgregado
    } catch ( err ) { throw err }
  } 

  async getUsuarios ( id_usuario ) {
    try {
      let usuarios = await usuariosRepository.getUsuarios( id_usuario )
      return usuarios
    } catch ( err ) { throw err }
  }
  
  async getUsuarioByUsername ( nombre ) {
    try {
      let usuarios = await usuariosRepository.getUsuarioByUsername( nombre )
      return usuarios
    } catch ( err ) { throw err }
  }

}

module.exports = UsuariosService