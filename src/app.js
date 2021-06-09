const cluster = require('cluster')
const mongoose = require('mongoose');
const path = require('path')
const numCPUs = require('os').cpus().length
const dotenv = require('dotenv')
const app = require('./services')
const { loggerError } = require('./services/logger.service')

dotenv.config({
  path: path.resolve(__dirname, '..', process.env.NODE_ENV  + '.env')
})

const PORT = process.env.PORT || 8080

if ( process.env.MODO == 'cluster') {
  if(cluster.isMaster) {

    for( let i = 0; i < numCPUs ; i++ ) {
      cluster.fork()
    }
  
    cluster.on( 'exit', (worker) => {
      loggerError.error(`worker ${worker.process.pid} died`)
    })
  } else {
    app.listen(PORT, () => {
      mongoose.connect(process.env.CONEXION_MONGO, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log(`Escuchando en el puerto ${PORT}. Worker ${process.pid} started`)
    })
  }
} else {
  app.listen(PORT, () => {
    mongoose.connect(process.env.CONEXION_MONGO, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(`Escuchando en el puerto ${PORT}. Worker ${process.pid} started`)
  })
}

