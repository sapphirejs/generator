const color = require('colors/safe')

class Logger {
  static info(message) {
    console.info(color.white(`\n   ${message}\n`))
  }

  static success(message) {
    console.info(color.green(`\n   ${message}\n`))
  }

  static warn(message) {
    console.warn(color.yellow(`\n   ${message}\n`))
  }

  static error(message) {
    console.error(color.red(`\n   ${message}\n`))
  }
}

module.exports = Logger
