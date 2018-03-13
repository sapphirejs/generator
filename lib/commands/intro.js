const chalk = require('chalk')

/**
 * Say Hi to the user.
 *
 * @module sapphirejs/generator
*/
class NewProject {
  constructor() {
    this.action = this.action.bind(this)
  }

  /**
   * Caporal action.
   */
  async action() {
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

module.exports = NewProject
