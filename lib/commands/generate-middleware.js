const { Filesystem, Driver } = require('@sapphirejs/filesystem')
const Template = require('../template')
const Process = require('../process')
const Logger = require('../Logger')
const paths = require('../config/paths')
const { decamelize, validIdentifier } = require('../helpers')

/**
 * Generate Middleware command.
 *
 * @class GenerateMiddleware
*/
class GenerateMiddleware {
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
  async action(args, options) {
    const name = args.name
    const filename = `${paths.middleware}/${decamelize(name)}.js`
    const filesystem = new Filesystem(new Driver.Local())
    const template = new Template(`${paths.templates}/middleware.html`)
    const logger = new Logger()

    // File exists. Show notice for the --force flag.
    if (await filesystem.exists(filename) && !options.force) {
      logger.error(`Middleware "${name}" already exists. Use the --force flag to overwrite it.`).output()
      return Process.kill
    }

    try {
      const path = await template.write(filename, { name: name })
      logger.success(`Middleware created successfully at: ${path}`)

      if (!validIdentifier(name) && !options.supress)
        logger.warn(`The class name "${name}" may be an invalid Javascript identifier. Consider renaming it.`)
      if (!name.match(/middleware/i) && !options.supress)
        logger.warn(`As a good practice, it would be better if you added a "Middleware" suffix to your class name. Example: ${name}Middleware.`)

      logger.output()

      return Process.graceful
    } catch(err) {
      logger.error(`Unable to write middleware file. System response: ${err.message}`).output()
      return Process.kill
    }
  }
}

module.exports = GenerateMiddleware
