#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../src/index.js';
import stylish from '../src/stylish.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, formater = 'stylish') => {
    const resultDiff = gendiff(filepath1, filepath2, formater);
    const style = formater.format;
    if (style === 'stylish') {
      console.log(stylish(resultDiff));
    }
  });

program.parse();
