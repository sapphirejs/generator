const handlebars = require('handlebars')
const Filesystem = require('./filesystem')

class Template {
  constructor(template) {
    this._template = template
  }

  write(file, parameters) {
    const filesystem = new Filesystem()
    const raw = filesystem.read(this._template)
    const template = handlebars.compile(raw)
    const source = template(parameters)

    return filesystem.write(file, source)
  }
}

module.exports = Template
