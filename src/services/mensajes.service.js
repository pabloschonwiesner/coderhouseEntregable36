const nodemailer = require("nodemailer");
const path = require('path')
const dotenv = require('dotenv')
const { loggerError, loggerConsola } = require('./logger.service')

dotenv.config({
  path: path.resolve(__dirname, '../..', process.env.NODE_ENV  + '.env')
})


const clienteTwilio = require('twilio')(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN)

class MensajesService {

  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'naomi.padberg75@ethereal.email',
        pass: 'pk2UKcgSA8HxFxaK87'
    }
  });


  async enviarCorreo (subject, text, html) {
    await this.transporter.sendMail({
      from: 'naomi.padberg75@ethereal.email',
      to: 'naomi.padberg75@ethereal.email',
      subject,
      text,
      html
    })
  }

  async enviarWhatsapp ( mensaje ) {
    clienteTwilio.messages.create({
      body: mensaje,
      from: `whatsapp:${process.env.TWILIO_NRO_SANDOX}`,
      to: `whatsapp:${process.env.TELEFONO_ADMINISTRADR}`
    })
    .then( message => loggerConsola.info(message.sid))
    .catch( err => loggerError.error(err))
  }

  async enviarSMS ( mensaje, telefono ) {
    clienteTwilio.messages.create({
      body: mensaje,
      from: '+13236760277',
      to: telefono
    })
    .then( message => loggerConsola.info(message.sid))
    .catch ( err => loggerError.error(err))
  }

}

module.exports = MensajesService