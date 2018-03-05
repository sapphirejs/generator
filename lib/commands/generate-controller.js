const Filesystem = require('../filesystem')
const Process = require('../process')

class GenerateController {
  constructor() {
    this.action = this.action.bind(this)
  }

  action(args, options) {
    let name = args.name
    let filesystem = new Filesystem('controller')
    let raw = options.resource
      ? filesystem.readTemplate('controller_resource')
      : filesystem.readTemplate('controller')
    let template = this.replaceControllerName(raw, name)

    if (filesystem.exists(name) && !options.force) {
      console.error(`Controller "${name}" already exists. Use the --force flag to overwrite it.`)
      return Process.kill
    }

    try {
      let path = filesystem.write(name, template)
      console.info(`Controller written successfully at: ${path}`)
      return Process.graceful
    } catch(err) {
      console.error(`Unable to write file. System response: ${err.message}`)
      return Process.kill
    }
  }

  replaceControllerName(template, name) {
    return template.replace(/{{class}}/g, name)
  }
}

module.exports = GenerateController
