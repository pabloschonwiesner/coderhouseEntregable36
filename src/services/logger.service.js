const log4js = require('log4js')

// logger
log4js.configure({
  appenders: { 
    fileWarn: { type: 'file', filename: './logs/warn.log'},
    fileError: { type: 'file', filename: './logs/error.log'},
    console: { type: 'console'}
  },
  categories: {
    default: { appenders: [ 'console'], level: 'info'},
    fileWarn: { appenders: [ 'fileWarn'], level: 'warn'},
    fileError: { appenders: [ 'fileError'], level: 'error'}
  }
})

const loggerConsola = log4js.getLogger()
const loggerWarn = log4js.getLogger('fileWarn')
const loggerError = log4js.getLogger('fileError')

module.exports = { loggerConsola, loggerWarn, loggerError }