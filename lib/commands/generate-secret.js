const crypto = require('crypto')
const Process = require('../process')
const Logger = require('../Logger')

/**
 * Generate secret key.
 *
 * @class GenerateSecret
*/
class GenerateSecret {
  constructor() {
    this.action = this.action.bind(this)
  }

  /**
   * Caporal action.
   *
   * @public
   * @param {array} args
   * @param {array} options
   */
  action(args, options) {
    const logger = new Logger()

    crypto.randomBytes(options.length, (err, buffer) => {
      if (err) {
        logger.error(`An error occured while generating the key. System response: ${err.message}`).output()
        Process.kill
      }

      const token = buffer.toString('hex')
      logger.success(token).output()
      Process.graceful
    })
  }
}

module.exports = GenerateSecret
