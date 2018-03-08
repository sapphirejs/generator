const Filesystem = require('../filesystem')
const Template = require('../template')
const Process = require('../process')
const Logger = require('../Logger')
const paths = require('../config/paths')
const { decamelize } = require('../helpers')

/**
 * Generate Middleware command.
 *
 * @module sapphirejs/generator
*/
class GenerateMiddleware {
  constructor() {
    this.action = this.action.bind(this)
  }

  /**
   * Caporal action.
   */
  action(args, options) {
    const name = args.name
    const filename = `${paths.middleware}/${decamelize(name)}.js`
    const filesystem = new Filesystem()
    const template = new Template(`${paths.templates}/middleware.html`)

    // Notice for the --force flag.
    if (filesystem.exists(filename) && !options.force) {
      Logger.error(`Middleware "${name}" already exists. Use the --force flag to overwrite it.`)
      return Process.kill
    }

    try {
      const path = template.write(filename, { name: name })
      Logger.success(`Middleware written successfully at: ${path}`)
      return Process.graceful
    } catch(err) {
      Logger.error(`Unable to write middleware file. System response: ${err.message}`)
      return Process.kill
    }
  }
}

module.exports = GenerateMiddleware
