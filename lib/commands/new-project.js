const { exec } = require('child_process')
const { promisify } = require('util')
const prompts = require('prompts')
const chalk = require('chalk')
const { Filesystem, Driver } = require('@sapphirejs/filesystem')
const ora = require('ora')
const Process = require('../process')
const Logger = require('../Logger')
const repos = require('../config/repos')

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
  async action(args, options) {
    const logger = new Logger()
    const filesystem = new Filesystem(new Driver.Local())

    console.log()
    const { response, confirm } = await this._prompt(args, options)

    // User didn't confirm.
    if (confirm.hasOwnProperty('confirm') && !confirm.confirm) {
      logger.warn(`Run "sapphire new" when you change your mind. See you soon.`).output()
      Process.graceful
    }

    const directory = args.directory || response.directory
    const template = options.template || response.template || response.repo
    const validationError = this._validateResponse({ directory, template })

    if (validationError) {
      logger.error(validationError).output()
      Process.kill
    }

    if (await filesystem.exists(directory)) {
      logger.error(`Directory "${directory}" already exists. Don't want to overwrite important work!`).output()
      Process.kill
    }

    const finalRepo = this._templateOrRepo(template)
    const command = `git clone ${finalRepo} ${directory}`
    const spinner = ora('Cloning template repo').start()

    try {
      await promisify(exec)(command)
      await filesystem.deleteAll(`${directory}/.git`)
      spinner.succeed(chalk.green('Project created successfully.\n'))
      Process.graceful
    }
    catch (err) {
      console.log(err)
      spinner.fail(chalk.red('Failed to download the template. Please try again or check if the input data are correct.\n'))
      Process.kill
    }
  }

  _templateOrRepo(template) {
    // An "official" template
    if (repos[template])
      return repos[template]

    // GitHub repo. Add .git if missing.
    return /(.+)\.git/.test(template)
      ? template
      : `${template}.git`
  }

  _isSupportedTemplate(template) {
    return Object.keys(repos).includes(template)
  }

  _isValidGithubRepo(repo) {
    return /https:\/\/github.com\/(.+)\/(.+)/.test(repo)
  }

  _validateResponse({ directory, template }) {
    if (!directory || directory === '')
      return `Project directory shouldn't be empty.`

    if (!template)
      return `Should have selected a template or input a valid GitHub repo.`

    if (!this._isSupportedTemplate(template) && !this._isValidGithubRepo(template))
      return `"${template}" isn't a valid template or GitHub repo.`

    return null
  }

  async _prompt(args, options) {
    const logger = new Logger()
    const response = await prompts([
      {
        type: args.directory ? null : 'text',
        name: 'directory',
        message: 'Project directory?'
      },
      {
        type: options.template ? null : 'select',
        name: 'template',
        message: 'Project template?',
        choices: [
          { title: 'API', value: 'api' },
          { title: 'Full', value: 'full' },
          { title: 'Minimal', value: 'minimal' },
          { title: '<GitHub Repo>', value: null },
        ],
        initial: 0
      },
      {
        type: prev => options.template || prev ? null : 'text',
        name: 'repo',
        message: 'GitHub repo URL?'
      }
    ], {
        onCancel() {
          logger.warn(`Can't create a project without first gathering all the data. Give it another spin.`).output()
          Process.graceful
        }
      })
    const confirm = await prompts({
      type: args.directory && options.template ? null : 'toggle',
      name: 'confirm',
      initial: true,
      active: 'yes',
      inactive: 'no',
      message: `Confirm the creation of "${args.directory || response.directory}"?"`
    }, {
        onCancel() {
          logger.warn(`Can't create a project without your confirmation. Sorry.`).output()
          Process.graceful
        }
      })

    return { response, confirm }
  }
}

module.exports = NewProject
