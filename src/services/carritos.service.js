const CarritosRepository = require('../repositories/carritos.repository')
const ProductosRepository = require('../repositories/productos.repository')

const carritosRepository = new CarritosRepository()
const productosRepository = new ProductosRepository()

class CarritosService {
  
  async getCarritos ( id_carrito ) {
    try {
      let carritos = await carritosRepository.getCarritos( id_carrito )
      if(!carritos) {
        throw Error('No existe el carrito')
      }
      return carritos
    } catch ( err ) { throw err }
  }

  async addCarrito ( id_carrito ) {
    try {
      let carritoAgregado = await carritosRepository.addCarrito( id_carrito )
      return carritoAgregado
    } catch ( err ) { throw err }
  }

  async addProductoCarrito ( id_carrito, id_producto ) {
    try {

      let carrito = await carritosRepository.getCarritos( id_carrito )
      if(!carrito) {
        await this.addCarrito( id_carrito )
      } 

      let producto = await productosRepository.getProductos( id_producto )
      if(producto.length > 0) {
        return await carritosRepository.addProductoCarrito( id_carrito, producto )
      } else {
        throw Error('No existe el producto')
      }
    } catch ( err ) { throw err }
  }

  async deleteProductoCarrito ( id_carrito, id_producto ) {
    try {
      let productoEliminado = await carritosRepository.deleteProductoCarrito( id_carrito, id_producto )
      return productoEliminado
    } catch ( err ) { throw err }
  }
}

module.exports = CarritosService