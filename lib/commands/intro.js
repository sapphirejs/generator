const chalk = require('chalk')

/**
 * Say Hi to the user.
 *
 * @class Intro
*/
class Intro {
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
  action() {
    console.log()
    console.log(`             ${chalk.blue('*')}`)
    console.log(`           ${chalk.blue('*')}${chalk.magenta('~~~')}${chalk.blue('*')}`)
    console.log(`         ${chalk.blue('*')}${chalk.magenta('~~~~~~~')}${chalk.blue('*')}`)
    console.log(`       ${chalk.blue('*')}${chalk.magenta('~~~~~~~~~~~')}${chalk.blue('*')}`)
    console.log(`     ${chalk.blue('*')}${chalk.magenta('~~~~~~~~~~~~~~~')}${chalk.blue('*')}`)
    console.log(`    ${chalk.blue('*')}${chalk.magenta('~~~~~~~~~~~~~~~~~')}${chalk.blue('*')}`)
    console.log(`   ${chalk.blue('*')}${chalk.magenta('~~~~~~~')}${chalk.blue('*')}${chalk.cyan('~~~')}${chalk.blue('*')}${chalk.magenta('~~~~~~~')}${chalk.blue('*')}`)
    console.log(`   ${chalk.blue('*')}${chalk.magenta('~~~~~')}${chalk.blue('*')}${chalk.cyan('~~~~~~~')}${chalk.blue('*')}${chalk.magenta('~~~~~')}${chalk.blue('*')}`)
    console.log(`   ${chalk.blue('*')}${chalk.magenta('~~~~~')}${chalk.blue('*')}${chalk.cyan('~~~~~~~')}${chalk.blue('*')}${chalk.magenta('~~~~~')}${chalk.blue('*')}`)
    console.log(`   ${chalk.blue('*')}${chalk.magenta('~~~~~')}${chalk.blue('*')}${chalk.cyan('~~~~~~~')}${chalk.blue('*')}${chalk.magenta('~~~~~')}${chalk.blue('*')}`)
    console.log(`   ${chalk.blue('*')}${chalk.magenta('~~~~~~~')}${chalk.blue('*')}${chalk.cyan('~~~')}${chalk.blue('*')}${chalk.magenta('~~~~~~~')}${chalk.blue('*')}`)
    console.log(`   ${chalk.blue('*')}${chalk.magenta('~~~~~~~~~~~~~~~~~~~')}${chalk.blue('*')}`)
    console.log(`    ${chalk.blue('*')}${chalk.magenta('~~~~~~~~~~~~~~~~~')}${chalk.blue('*')}`)
    console.log(`      ${chalk.blue('*')}${chalk.magenta('~~~~~~~~~~~~~')}${chalk.blue('*')}`)
    console.log(`         ${chalk.blue('*')}${chalk.magenta('~~~~~~~')}${chalk.blue('*')}`)
    console.log(`            ${chalk.blue('***')}`)

    console.log()
    console.log(chalk.cyan(" Hi from Sapphire Framework"))
    console.log(chalk.magenta("Happy to serve your dev needs"))
    console.log(`\n        ${chalk.blue('¯\\_(ツ)_/¯')}`)
    console.log()
  }
}

module.exports = Intro
