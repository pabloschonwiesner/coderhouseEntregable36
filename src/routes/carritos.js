const Router = require('express')
const router = Router()
const { isAuthenticated } = require('./../middlewares/auth')

const CarritosService = require('../services/carritos.service')
const carritosService = new CarritosService()

const Helpers = require('../helpers')
const helpers = new Helpers()

router.get('/', isAuthenticated, async (req, res) => {
  try {
    let carrito = await carritosService.getCarritos()
    return helpers.respuestaExitosa(res, carrito)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.get('/miCarrito', isAuthenticated, async (req, res) => {
  try {
    let carrito = await carritosService.getCarritos( req.session.passport.user )
    return helpers.respuestaExitosa(res, carrito)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.put('/:id_producto', isAuthenticated, async (req, res) => {
  try {
    let productoAgregado = await carritosService.addProductoCarrito( req.session.passport.user, req.params.id_producto )
    return helpers.respuestaExitosa(res, productoAgregado)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.delete('/:id_producto', isAuthenticated, async (req, res) => {
  try {
    let productoEliminado = await carritosService.deleteProductoCarrito( req.session.passport.user, req.params.id_producto )
    return helpers.respuestaExitosa(res, productoEliminado)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.get('/finalizarCompra', isAuthenticated, async (req, res) => {
  try {
    let carrito = await carritosService.finalizarCompra( req.session.passport.user )
    return helpers.respuestaExitosa(res, carrito)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

module.exports = router