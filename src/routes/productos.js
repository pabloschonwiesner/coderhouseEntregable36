const Router = require('express')
const router = Router()

const { isAuthenticated } = require('../middlewares/auth')

const ProductosService = require('../services/productos.service')
const productosService = new ProductosService()

const Helpers = require('../helpers')
const helpers = new Helpers()


router.get('/:id_producto?', isAuthenticated,  async (req, res) => {
  try {
    let productos = await productosService.getProductos( req.params.id_producto, req.query )
    return helpers.respuestaExitosa(res, productos )
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.post('/', isAuthenticated, async (req, res) => {
  try {
    let productoAgregado = await productosService.addProducto( req.body )
    return helpers.respuestaExitosa(res, productoAgregado)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.put('/:id_producto', isAuthenticated, async (req, res) => {
  try {
    let productoActualizado = await productosService.updateProducto( req.params.id_producto, req.body )
    return helpers.respuestaExitosa(res, productoActualizado)
  } catch ( err ) { return helpers.respuestaError( res, err ) }
})

router.delete('/:id_producto', isAuthenticated,  async (req, res) => {
  try {
    let productoEliminado = await productosService.deleteProducto( req.params.id_producto )
    return helpers.respuestaExitosa(res, productoEliminado)
  } catch ( err ) { return helpers.respuestaError( res, err ) }
})

module.exports = router