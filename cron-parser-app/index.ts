import * as commander from 'commander';
import ExpressionParser from './expression-parser';

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
    const parsedExpression = new ExpressionParser(cronExpression).getParsedExpression();
    console.log('***');
    console.log('Minutes: ' + parsedExpression.minutes);
    console.log('Hours: ' + parsedExpression.hours);
    console.log('Day of month: ' + parsedExpression.dayMonth);
    console.log('Month: ' + parsedExpression.month);
    console.log('Day of week: ' + parsedExpression.dayWeek);
    console.log('Command: ' + parsedExpression.command);
    console.log('***');
  });

program.parse(process.argv);
