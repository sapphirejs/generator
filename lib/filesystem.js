const fs = require('fs')
const path = require('path')
const paths = require('./config/paths')

/**
 * Filesystem operations.
 *
 * @module sapphirejs/generator
*/
class Filesystem {
  constructor(type) {
    this._type = type
  }

  /**
   * Read a template file.
   *
   * @param {string} name
   * @returns {string}
   */
  readTemplate(name) {
    let file = path.join(__dirname, 'templates', `${name}.tpl`)
    return fs.readFileSync(file, 'utf8')
  }

  /**
   * Write a file by creating the non existing
   * directories.
   *
   * @param {string} name
   * @param {string} contents
   * @returns {string}
   * @throws If any error except EEXIST shows up.
   */
  write(name, contents) {
    // Start from the left-most parent and try
    // creating the directories if they don't exist.
    let dir = paths[this._type].split('/').reduce((parent, current) => {
      // Build the directory by joining the accumulator
      // with the current directory.
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

  /**
   * Checks if a directory exists.
   *
   * @param {string} name
   * @returns {boolean}
   */
  exists(name) {
    let file = path.join(...paths[this._type].split('/'), `${name}.js`)
    return fs.existsSync(file)
  }
}

module.exports = Filesystem
