#!/usr/bin/env node
const program = require('caporal');
const version = require('../package.json').version
const NewProject = require('../lib/commands/new-project')
const GenerateController = require('../lib/commands/generate-controller')
const GenerateMiddleware = require('../lib/commands/generate-middleware')
const GenerateSecret = require('../lib/commands/generate-secret')

program
  .version(version)
  .description('Sapphire Framework application and services generator')

  .command('new', 'Create a new Sapphire project')
  .argument('[name]', 'Project name')
  .action(new NewProject().action)

  .command('gen:controller', 'Generate a Controller').alias('g:c')
  .argument('<name>', 'Controller class name')
  .option('--resource', 'Generate a resourceful Controller')
  .option('--methods <methods>', 'Controller methods', program.LIST)
  .option('--force', 'Overwrite if file exists')
  .option('--supress', 'Supress advices')
  .action(new GenerateController().action)

  .command('gen:middleware', 'Generate a Middleware').alias('g:mw')
  .argument('<name>', 'Middleware class name')
  .option('--force', 'Overwrite if file exists')
  .option('--supress', 'Supress advices')
  .action(new GenerateMiddleware().action)

  .command('gen:secret', 'Generate a Cryptographically Strong Pseudo-Random Key').alias('g:s')
  .option('--length <length>', 'Length of the Generated Secret', program.INT, 32)
  .action(new GenerateSecret().action)

program.parse(process.argv)
