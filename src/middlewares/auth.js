
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UsuariosService = require('./../services/usuarios.service')
const Helpers = require('../helpers')

const usuariosService = new UsuariosService()
const helpers = new Helpers()


const login = async function ( username, password, done ) {
  try {
    let usuarioDB = await usuariosService.getUsuarioByUsername( username )
    if(usuarioDB.length > 0) {
      const validate = await usuarioDB[0].isValidPassword( password )

      if(!validate) {
        return done(null, false, { message: 'Password incorrecto!'})
      }
      return done(null, usuarioDB[0], 'Ingreso correctamente!')
    } else {
      return done(null, false, { message: 'Usuario no encontrado'})
    }
  } catch ( err ) { console.log(err); return done(err)}
  
}

const isAuthenticated = function (req, res, next) {
  if( !!req.session.passport == true ) {
    return next()
  } else {
    return helpers.respuestaSinAutorizacion(req, res)
  }
}

passport.use('login', new LocalStrategy({usernameField: 'usuario', passwordField: 'password', session: true}, login ) )


module.exports = { passport, isAuthenticated }