const handlebars = require('handlebars')
const Filesystem = require('../filesystem')
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

    // Notice for the --force flag.
    if (filesystem.exists(filename) && !options.force) {
      Logger.error(`Controller "${name}" already exists. Use the --force flag to overwrite it.`)
      return Process.kill
    }

    try {
      const raw = filesystem.read(`${paths.templates}/controller.html`)
      const source = handlebars.compile(raw)({
        name: name,
        resource: !!options.resource,
        methods: !options.resource && options.methods ? options.methods : []
      })
      const path = filesystem.write(filename, source)

      Logger.success(`Controller written successfully at: ${path}`)
      return Process.graceful
    } catch(err) {
      Logger.error(`Unable to write file. System response: ${err.message}`)
      return Process.kill
    }
  }
}

module.exports = GenerateController
