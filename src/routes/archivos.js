const Router = require('express')
const SubidaService = require('./../services/subida.service')

const router = Router()

const fileUpload = require('express-fileupload')

const Helpers = require('./../helpers')

const helpers = new Helpers()
const subidaService = new SubidaService()

router.use(fileUpload({ useTempFiles: true}))

router.post('/subidaArchivo', async (req, res) => {
  try {
    let archivoSubido = await subidaService.subirArchivo(req.files)
    return helpers.respuestaExitosa(res, archivoSubido) 

  } catch ( err ) { helpers.respuestaError(res, err)}

  
})

module.exports = router