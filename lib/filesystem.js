const fs = require('fs')
const path = require('path')

/**
 * Filesystem operations.
 *
 * @module sapphirejs/generator
*/
class Filesystem {
  /**
   * Read a file.
   *
   * @param {string} file
   * @returns {string}
   */
  read(file) {
    return fs.readFileSync(path.join(...file.split('/')), 'utf8')
  }

  /**
   * Write a file by creating the non existing
   * directories.
   *
   * @param {string} file
   * @param {string} contents
   * @returns {string}
   * @throws If any error except EEXIST shows up.
   */
  write(file, contents) {
    // Start from the left-most parent and try
    // creating the directories if they don't exist.
    const dir = path.dirname(file).split(path.sep).reduce((parent, current) => {
      // Build the directory by joining the accumulator
      // with the current directory.
      const dir = path.join(parent, current)

      try {
        fs.mkdirSync(dir)
      } catch(err) {
        if (err.code !== 'EEXIST') throw err
      }

      return dir
    }, '')

    fs.writeFileSync(
      path.join(dir, `${path.basename(file)}`),
      contents,
      'utf8'
    )

    return file
  }

  /**
   * Checks if a directory exists.
   *
   * @param {string} file
   * @returns {boolean}
   */
  exists(file) {
    return fs.existsSync(path.join(...file.split('/')))
  }

  /**
   * Deletes a directory.
   *
   * @param {string} dir
   */
  delete(dir) {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach((file) => {
        var curPath = path.join(dir, file)
        if (fs.lstatSync(curPath).isDirectory()) {
          this.delete(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })

      fs.rmdirSync(dir);
    }
  }
}

module.exports = Filesystem
