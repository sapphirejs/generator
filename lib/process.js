/**
 * Simple interface to process module.
 *
 * @class Process
*/
class Process {
  static get kill() {
    return process.exit(1)
  }

  static get graceful() {
    return process.exit(0)
  }
}

module.exports = Process
