const Filesystem = require('../filesystem')
const Process = require('../process')
const Logger = require('../Logger')
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
    const filename = decamelize(name)
    const filesystem = new Filesystem('controller')

    // A --resource option needs a different template.
    const raw = options.resource
      ? filesystem.readTemplate('controller_resource')
      : filesystem.readTemplate('controller')
    const template = this.replaceControllerName(raw, name)

    // Notice for the --force flag.
    if (filesystem.exists(filename) && !options.force) {
      Logger.error(`Controller "${name}" already exists. Use the --force flag to overwrite it.`)
      return Process.kill
    }

    try {
      const path = filesystem.write(filename, template)
      Logger.success(`Controller written successfully at: ${path}`)
      return Process.graceful
    } catch (err) {
      Logger.error(`Unable to write file. System response: ${err.message}`)
      return Process.kill
    }
  }

  /**
   * Replace the class placeholder in the template
   * with the actual name.
   *
   * @param {string} template
   * @param {string} name
   * @returns {string}
   */
  replaceControllerName(template, name) {
    return template.replace(/{{class}}/g, name)
  }
}

module.exports = GenerateController
