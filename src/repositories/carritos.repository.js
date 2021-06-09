
const Carrito = require('./../models/carritos.model')
const Producto = require('./../models/productos.model')

class CarritosRepository {

  async addCarrito ( id_usuario ) {
    try {
      let nuevoCarrito = new Carrito({id_usuario})
      return await nuevoCarrito.save()
    } catch ( err ) { throw err }
  }

  async getCarritos ( id_usuario ) {
    try {
      if( id_usuario ) {
        let carrito = await Carrito.findOne( { id_usuario })
        if(carrito.length == 0) {
          return undefined
        }
        return carrito
      } else {
        let carritos = await Carrito.find()
        return carritos

      }
    } catch ( err ) { throw err }
  }

  async addProductoCarrito ( id_usuario, prod ) {
    try {
      let carrito = await Carrito.findOne( { id_usuario })
      let nuevoProducto = new Producto({ nombre: prod.nombre, descripcion: prod.descripcion, codigo: prod.codigo, foto: prod.foto, precio: prod.precio, stock: prod.stock})
      carrito.productos.push(nuevoProducto)
      return await carrito.save()
    } catch ( err ) { throw err }
  }

  async deleteProductoCarrito ( id_usuario, id_producto ) {
    try {
      let carrito = await Carrito.findOne( { id_usuario })
      let index = carrito.productos.findIndex( producto => producto.id_producto == id_producto )
      carrito.productos.splice( index, 1)
      return await carrito.save()
    } catch ( err ) { throw err }
  }

  async getCarritoById ( id_usuario ) {
    try {
      return await Carrito.findOne( { id_usuario } )      
    } catch ( err ) { throw err }
  }

}

module.exports = CarritosRepository