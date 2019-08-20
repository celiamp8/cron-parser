import * as commander from 'commander';

commander
  .version('1.0.0')
  .name('CRON Parser');

commander
  .command('inputExpression')
  .description('Input a CRON expression')
  .action(() => {
    console.log('AHOY M8Y');
  });
