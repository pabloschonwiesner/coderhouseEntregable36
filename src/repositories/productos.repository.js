
const Producto = require('./../models/productos.model')

class ProductosRepository {

  async getProductos ( id_producto, queryParams ) {
    try {
      let filters = { $and: [] } 

      if(queryParams.precioMinimo) {
        filters.$and.push( { precio: { $gte: Number(queryParams.precioMinimo)} })
      } 
      
      if(queryParams.precioMaximo) {
        filters.$and.push( { precio: { $lte: Number(queryParams.precioMaximo)} })
      }

      if(queryParams.nombre) {
        filters.$and.push( { nombre: { $regex: `.*${queryParams.nombre}`, $options: 'i'} } )
      }


      if( id_producto ) {
        let productos = await Producto.find( { id_producto })
        return productos
      } else {
        let productos = await Producto.find( filters )
        return productos

      }
    } catch ( err ) { throw err }
  }

  async addProducto ( producto ) {
    try {
      let nuevoProducto = new Producto({ nombre: producto.nombre, descripcion: producto.descripcion, codigo: producto.codigo, foto: producto.foto, precio: producto.precio, stock: producto.stock})
      return await nuevoProducto.save()
    } catch ( err ) { throw err }
  }

  async updateProducto ( id_producto, producto ) {
    try {
      return await Producto.updateOne({ id_producto }, { $set: producto })
    } catch ( err ) { throw err }
  }

  async deleteProducto ( id_producto ) {
    try {
      return await Producto.deleteOne( { id_producto })
    } catch ( err ) { throw err }
  }

}

module.exports = ProductosRepository