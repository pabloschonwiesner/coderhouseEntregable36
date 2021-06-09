const fs = require('fs')
const path = require('path')
const { loggerError, loggerConsola } = require('./logger.service')

class SubidaService {

  async subirArchivo ( archivos ) {
    try {
      if(!archivos) throw { message: 'No se ha seleccionado ningún archivo', details: ''}

      let archivo = archivos.archivo

      let arrayNombreArchivoSplit = archivo.name.split('.')

      let extension = arrayNombreArchivoSplit[arrayNombreArchivoSplit.length -1].toLowerCase()

      let extensionesValidas = ['pdf', 'jpg', 'jpeg', 'png']

      if(extensionesValidas.indexOf(extension) < 0) throw { message: 'Las extensiones de archivos permitidas son ' + extensionesValidas.join(), details: ''}

      let ruta = path.resolve(__dirname, `./../archivos`)

      fs.stat(ruta, async (err, stat) => {
        if(err) {
          fs.mkdir(ruta, { recursive: true }, (err) => {
            if (err) {
              loggerError.error(err)
              throw err
            };
          });
        }

        this.moverArchivo(ruta, archivo)
          .then( (archivoMovido) => {
            return archivoMovido
          })
          .catch( err => {
            loggerError.error(err)
            throw Err(err + 'No se pudo mover el archivo')
          })
      })
    } catch ( err ) { throw err }
  }

  moverArchivo ( ruta, archivo ) {
    return new Promise((resolve, reject) => {
      archivo.mv(`${ruta}/${archivo.name}`, (err) => {
        if( err ) {reject(false)}
        resolve(true)
      })
    })
  }
}

module.exports = SubidaService