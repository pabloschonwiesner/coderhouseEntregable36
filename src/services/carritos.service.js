const CarritosRepository = require('../repositories/carritos.repository')
const ProductosRepository = require('../repositories/productos.repository')
const UsuariosRepository = require('../repositories/usuarios.repository')
const MensajesService = require('../services/mensajes.service')

const carritosRepository = new CarritosRepository()
const productosRepository = new ProductosRepository()
const usuariosRepository = new UsuariosRepository()
const mensajesService = new MensajesService()

class CarritosService {
  
  async getCarritos ( id_usuario ) {
    try {
      let carritos = await carritosRepository.getCarritos( id_usuario )
      if(!carritos) {
        throw Error('No existe el carrito')
      }
      return carritos
    } catch ( err ) { throw err }
  }

  async addCarrito ( id_usuario ) {
    try {
      let carritoAgregado = await carritosRepository.addCarrito( id_usuario )
      return carritoAgregado
    } catch ( err ) { throw err }
  }

  async addProductoCarrito ( id_usuario, id_producto ) {
    try {

      let carrito = await carritosRepository.getCarritoById( id_usuario )
      if(!carrito) {
        await this.addCarrito( id_usuario )
      } 

      let producto = await productosRepository.getProductos( id_producto )
      if(producto.length > 0) {
        return await carritosRepository.addProductoCarrito( id_usuario, producto[0] )
      } else {
        throw Error('No existe el producto')
      }
    } catch ( err ) { throw err }
  }

  async deleteProductoCarrito ( id_usuario, id_producto ) {
    try {
      let productoEliminado = await carritosRepository.deleteProductoCarrito( id_usuario, id_producto )
      return productoEliminado
    } catch ( err ) { throw err }
  }

  async finalizarCompra ( id_usuario ) {
    try {

      let carrito = await this.getCarritos( id_usuario)
      let usuario = await usuariosRepository.getUsuarioById(carrito.id_usuario)
      console.log(`${usuario.nombre} - ${usuario.email}`);
      let message = `Nuevo pedido de ${usuario.nombre} - ${usuario.email}`
      let text = ''

      carrito.productos.forEach( prod => {
        text = `${text}${prod.descripcion}\n`
      })
      console.log(text)
      await mensajesService.enviarCorreo(message, text )
      await mensajesService.enviarWhatsapp(message)
      await mensajesService.enviarSMS('Su pedido ha sido recibido y se encuentra en proceso', usuario.telefono)
      return true
    } catch ( err ) { throw err }
  }
}

module.exports = CarritosService