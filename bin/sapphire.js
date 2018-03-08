#!/usr/bin/env node
const program = require('caporal');
const version = require('../package.json').version
const GenerateController = require('../lib/commands/generate-controller')
const GenerateMiddleware = require('../lib/commands/generate-middleware')

program
  .version(version)
  .description('Sapphire Framework application and services generator')

  .command('gen:controller', 'Generate a Controller').alias('g:c')
  .argument('<name>', 'Controller class name')
  .option('--resource', 'Generate a resourceful Controller')
  .option('--methods <methods>', 'Controller methods', program.LIST)
  .option('--force', 'Overwrite if file exists')
  .action(new GenerateController().action)

  .command('gen:middleware', 'Generate a Middleware').alias('g:mw')
  .argument('<name>', 'Middleware class name')
  .option('--force', 'Overwrite if file exists')
  .action(new GenerateMiddleware().action)

program.parse(process.argv)
