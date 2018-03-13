const prompts = require('prompts')
const Process = require('../process')
const Logger = require('../Logger')
const { printIntro } = require('../helpers')

/**
 * Create a new Sapphire project.
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
  async action(args) {
    const logger = new Logger()

    console.log()
    const response = await prompts([
      {
        type: args.name ? null : 'text',
        name: 'name',
        message: 'Project name?'
      },
      {
        type: 'text',
        name: 'dir',
        message: 'Project directory?',
        initial: prev => `${args.name || prev}`
      },
      {
        type: 'select',
        name: 'type',
        message: 'Project type?',
        choices: [
          { title: 'Full', value: 'full' },
          { title: 'API', value: 'api' },
          { title: 'Minimal', value: 'minimal' },
        ],
        initial: 0
      }
    ], {
      onCancel() {
        logger.warn(`Can't create a project without first gathering all the data. Give it another spin.`).output()
        Process.graceful
      }
    })
    const confirm = await prompts({
      type: 'toggle',
      name: 'confirm',
      initial: true,
      active: 'yes',
      inactive: 'no',
      message: `Confirm the creation of "${args.name || response.name}" in /${response.dir}?"`
    }, {
      onCancel() {
        logger.warn(`Can't create a project without your confirmation. Sorry.`).output()
        Process.graceful
      }
    })

    // User didn't confirm.
    if (!confirm.confirm) {
      logger.warn(`Run "sapphire new" when you change your mind. See you soon.`).output()
      Process.graceful
    }

    const name = args.name || response.name
    const dir = response.dir
    const type = response.type
    const supportedTypes = ['full', 'api', 'minimal']

    if (!name || name === '') {
      logger.error(`Project name shouldn't be empty.`).output()
      Process.graceful
    }

    if (!dir || dir === '') {
      logger.error(`Project directory shouldn't be empty.`).output()
      Process.graceful
    }

    if (!supportedTypes.includes(type)) {
      logger.error(`Uknown project type ${type}. Please choose one of: ${supportedTypes.join(', ')}`).output()
      Process.graceful
    }

    console.log(response)
    console.log()
  }
}

module.exports = NewProject
