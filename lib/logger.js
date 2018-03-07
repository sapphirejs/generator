const color = require('colors/safe')

class Logger {
  static info(message) {
    console.info(color.white(`${message}\n`))
  }

  static success(message) {
    console.info(color.green(`${message}\n`))
  }

  static warn(message) {
    console.warn(color.yellow(`${message}\n`))
  }

  static error(message) {
    console.error(color.red(`${message}\n`))
  }
}

module.exports = Logger
