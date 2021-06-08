const ProductosRepository = require('../repositories/productos.repository')
const productosRepository = new ProductosRepository()

class ProductosService {
  
  async getProductos ( id_producto, queryParams ) {
    try {
      let productos = await productosRepository.getProductos( id_producto, queryParams )
      return productos
    } catch ( err ) { throw err }
  }prod

  async addProducto ( producto ) {
    try {
      let productoAgregado = await productosRepository.addProducto( producto )
      return productoAgregado
    } catch ( err ) { throw err }
  }

  async updateProducto ( id_producto, producto ) {
    try {
      let productoActualizado = await productosRepository.updateProducto( id_producto, producto )
      return productoActualizado
    } catch ( err ) { throw err }
  }

  async deleteProducto ( id_producto ) {
    try {
      let productoEliminado = await productosRepository.deleteProducto( id_producto )
      return productoEliminado
    } catch ( err ) { throw err }
  }
}

module.exports = ProductosService