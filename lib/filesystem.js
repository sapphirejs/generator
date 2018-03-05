const fs = require('fs')
const path = require('path')
const paths = require('./config/paths')

class Filesystem {
  constructor(type) {
    this._type = type
  }

  readTemplate(name) {
    let file = path.join(__dirname, 'templates', `${name}.tpl`)
    return fs.readFileSync(file, 'utf8')
  }

  write(name, contents) {
    let dir = paths[this._type].split('/').reduce((parent, current) => {
      let dir = path.join(parent, current)
      try {
        fs.mkdirSync(dir)
      } catch(err) {
        if (err.code !== 'EEXIST') throw err
      }

      return dir
    }, '')

    let file = path.join(dir, `${name}.js`)
    fs.writeFileSync(file, contents, 'utf8')
    return file
  }

  exists(name) {
    let file = path.join(...paths[this._type].split('/'), `${name}.js`)
    return fs.existsSync(file)
  }
}

module.exports = Filesystem