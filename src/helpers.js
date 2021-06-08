class Helpers {

  respuestaExitosa (res, data) {
    return res
      .status(200)
      .json({
        err: {},
        data: data
      })
  }

  respuestaSinAutorizacion (req, res) {
    return res
      .status(401)
      .json({
        err: -1,
        descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada`
      })
  }

  respuestaError (res, err) {
    return res
      .status(500)
      .json({
        err: err.message
      })
  }

}

module.exports = Helpers