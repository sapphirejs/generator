const color = require('chalk')

/**
 * Simple logger for the console.
 *
 * @class Logger
 */
class Logger {
  constructor() {
    this._messages = []
  }

  /**
   * Info message.
   *
   * @public
   * @param {string} message
   * @retuns {Logger}
   */
  info(message) {
    this._addMessage(color.white(`   ${message}`))
    return this
  }

  /**
   * Success message.
   *
   * @public
   * @param {string} message
   * @retuns {Logger}
   */
  success(message) {
    this._addMessage(color.green(`✓  ${message}`))
    return this
  }

  /**
   * Warning message.
   *
   * @public
   * @param {string} message
   * @retuns {Logger}
   */
  warn(message) {
    this._addMessage(color.yellow(`‼  ${message}`))
    return this
  }

  /**
   * Error message.
   *
   * @public
   * @param {string} message
   * @retuns {Logger}
   */
  error(message) {
    this._addMessage(color.red(`✕  ${message}`))
    return this
  }

  /**
   * Outputs to the console.
   *
   * @public
   */
  output() {
    console.log(`\n${this._messages.join('\n\n')}\n`)
  }

  /**
   * Adds a message to the list.
   *
   * @private
   * @param {string} message
   */
  _addMessage(message) {
    this._messages.push(message)
  }
}

module.exports = Logger
