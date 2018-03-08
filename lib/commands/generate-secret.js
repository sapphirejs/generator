const crypto = require('crypto')
const Process = require('../process')
const Logger = require('../Logger')

/**
 * Generate secret key.
 *
 * @module sapphirejs/generator
*/
class GenerateSecret {
  constructor() {
    this.action = this.action.bind(this)
  }

  /**
   * Caporal action.
   */
  action(args, options) {
    crypto.randomBytes(options.length, (err, buffer) => {
      if (err) {
        Logger.error(`An error occured while generating the key. System response: ${err.message}`)
        Process.kill
      }

      const token = buffer.toString('hex')
      Logger.success(token)
      Process.graceful
    })
  }
}

module.exports = GenerateSecret
