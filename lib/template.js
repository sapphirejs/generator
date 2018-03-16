const fsPath = require('path')
const handlebars = require('handlebars')
const { Filesystem, Driver } = require('@sapphirejs/filesystem')

class Template {
  constructor(template) {
    this._template = template
  }

  async write(file, parameters) {
    const filesystem = new Filesystem(new Driver.Local())
    const raw = await filesystem.read(this._template)
    const template = handlebars.compile(raw)
    const source = template(parameters)

    await filesystem.createDir(fsPath.dirname(file), null, true)
    await filesystem.write(file, source)
    return file
  }
}

module.exports = Template
