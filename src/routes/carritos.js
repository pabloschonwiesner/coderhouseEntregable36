const Router = require('express')
const router = Router()

const { verificaPerfil } = require('./../auth')

const CarritosService = require('../services/carritos.service')
const carritosService = new CarritosService()

const Helpers = require('../helpers')
const helpers = new Helpers()

router.get('/:id_carrito?', async (req, res) => {
  try {
    let carrito = await carritosService.getCarritos( req.params.id_carrito )
    return helpers.respuestaExitosa(res, carrito)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.put('/:id_carrito/:id_producto', async (req, res) => {
  try {
    let productoAgregado = await carritosService.addProductoCarrito( req.params.id_carrito, req.params.id_producto )
    return helpers.respuestaExitosa(res, productoAgregado)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.delete('/:id_carrito/:id_producto', async (req, res) => {
  try {
    let productoEliminado = await carritosService.deleteProductoCarrito( req.params.id_carrito, req.params.id_producto )
    return helpers.respuestaExitosa(res, productoEliminado)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

module.exports = router