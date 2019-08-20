"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander = require("commander");
var program = new commander.Command;
program
    .version('1.0.0')
    .name('CRON Parser')
    .description("Command line app to parse CRON expressions");
console.info('PROOOOOOO');
program
    .command('cron-parser <cronExpression>')
    .alias('cp')
    .description('CRON expression parser')
    .action(function (cronExpression) {
    console.log(cronExpression);
});
program.parse(process.argv);
