const Filesystem = require('../filesystem')
const Template = require('../template')
const Process = require('../process')
const Logger = require('../Logger')
const paths = require('../config/paths')
const { decamelize } = require('../helpers')

/**
 * Generate Controller command.
 *
 * @module sapphirejs/generator
*/
class GenerateController {
  constructor() {
    this.action = this.action.bind(this)
  }

  /**
   * Caporal action.
   */
  action(args, options) {
    const name = args.name
    const filename = `${paths.controller}/${decamelize(name)}.js`
    const filesystem = new Filesystem()
    const template = new Template(`${paths.templates}/controller.html`)

    // Notice for the --force flag.
    if (filesystem.exists(filename) && !options.force) {
      Logger.error(`Controller "${name}" already exists. Use the --force flag to overwrite it.`)
      return Process.kill
    }

    try {
      const path = template.write(filename, {
        name: name,
        resource: !!options.resource,
        methods: !options.resource && options.methods ? options.methods : []
      })

      Logger.success(`Controller written successfully at: ${path}`)
      if (options.resource && options.methods)
        Logger.warn(`The --resource option takes precedence over --methods. The latter was ignored.`, false)

      return Process.graceful
    } catch(err) {
      Logger.error(`Unable to write controller file. System response: ${err.message}`)
      return Process.kill
    }
  }
}

module.exports = GenerateController
