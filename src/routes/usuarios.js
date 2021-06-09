const Router = require('express')
const { passport, isAuthenticated } = require('./../middlewares/auth')
const { loggerConsola } = require('../services/logger.service')

const router = Router()

const Usuario = require('./../models/usuarios.model')
const UsuariosService = require('../services/usuarios.service')
const MensajesService = require('../services/mensajes.service')

const usuariosService = new UsuariosService()
const mensajesService = new MensajesService()

const Helpers = require('../helpers')
const helpers = new Helpers()


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, function (err, user) {
    done(err, user);
  });
});

router.get('/usuarios/:id_usuario?', isAuthenticated,  async (req, res) => {
  try {
    let usuarios = await usuariosService.getUsuarios( req.params.id_usuario )
    return helpers.respuestaExitosa(res, usuarios )
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.post('/', async (req, res) => {
  try {
    let usuarioAgregado = await usuariosService.addUsuario( req.body )
    mensajesService.enviarCorreo('Nuevo registro', JSON.stringify(usuarioAgregado) )
    return helpers.respuestaExitosa(res, usuarioAgregado)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.post('/login', passport.authenticate('login'), async (req, res) => {
  try {
    return helpers.respuestaExitosa(res, true)
  } catch ( err ) { return helpers.respuestaError(res, err) }
})

router.get('/salir', isAuthenticated, (req, res) => {
  req.session.destroy( () => {
    loggerConsola.info('Session cerrada!')
    return helpers.respuestaExitosa(res, true)
  })
})

module.exports = router