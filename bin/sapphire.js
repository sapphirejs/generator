#!/usr/bin/env node
const program = require('caporal');
const version = require('../package.json').version

const GenerateController = require('../lib/commands/GenerateController')

program
  .version(version)
  .description('Sapphire Framework application and services generator')

  .command('generate:controller', 'Generate a Controller').alias('g:c')
  .argument('<name>', 'Controller class name')
  .option('--resource', 'Generate a resourceful Controller')
  .option('--force', 'Overwrite if file exists')
  .action(new GenerateController().action)

program.parse(process.argv)