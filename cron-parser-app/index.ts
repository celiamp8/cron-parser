import * as commander from 'commander';
import * as parser from './expression-parser';

const program = new commander.Command;

program
  .version('1.0.0')
  .name('CRON Parser')
  .description("Command line app to parse CRON expressions");

console.log('');
console.log(' CRON EXPRESSION PARSER ');
console.log('========================');
console.log('');

program
  .command('cron-parser <cronExpression>')
  .alias('cp')
  .description('CRON expression parser')
  .action((cronExpression) => {
    console.log(parser.parseExpression(cronExpression));
  });

program.parse(process.argv);
