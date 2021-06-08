const Helpers = require('./helpers')
const helpers = new Helpers()

const verificaPerfil = (req, res, next) => {
  let header = req.headers

  if(header.perfil == 1) {
    next()
  } else {
    return helpers.respuestaSinAutorizacion(req, res)
  }
}

module.exports = {
  verificaPerfil
}