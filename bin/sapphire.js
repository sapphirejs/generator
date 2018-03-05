#!/usr/bin/env node
const program = require('caporal');
const version = require('../package.json').version

const GenerateController = require('../lib/commands/generate-controller')

program
  .version(version)
  .description('Sapphire Framework application and services generator')

  .command('gen:controller', 'Generate a Controller').alias('g:c')
  .argument('<name>', 'Controller class name')
  .option('--resource', 'Generate a resourceful Controller')
  .option('--force', 'Overwrite if file exists')
  .action(new GenerateController().action)

program.parse(process.argv)
