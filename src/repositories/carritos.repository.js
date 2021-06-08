
const Carrito = require('./../models/carritos.model')
const Producto = require('./../models/productos.model')

class CarritosRepository {

  async addCarrito ( id_carrito ) {
    try {
      let nuevoCarrito = new Carrito()
      return await nuevoCarrito.save()
    } catch ( err ) { throw err }
  }

  async getCarritos ( id_carrito ) {
    try {
      if( id_carrito ) {
        let carrito = await Carrito.find( { id_carrito })
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

  async addProductoCarrito ( id_carrito, prod ) {
    try {
      let carrito = await Carrito.findOne( { id_carrito })
      let nuevoProducto = new Producto({ nombre: prod.nombre, descripcion: prod.descripcion, codigo: prod.codigo, foto: prod.foto, precio: prod.precio, stock: prod.stock})
      carrito.productos.push(nuevoProducto)
      return await carrito.save()
    } catch ( err ) { throw err }
  }

  async deleteProductoCarrito ( id_carrito, id_producto ) {
    try {
      let carrito = await Carrito.findOne( { id_carrito })
      let index = carrito.productos.findIndex( producto => producto.id_producto == id_producto )
      carrito.productos.splice( index, 1)
      return await carrito.save()
    } catch ( err ) { throw err }
  }

}

module.exports = CarritosRepository