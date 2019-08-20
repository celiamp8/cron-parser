"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander = require("commander");
commander
    .version('1.0.0')
    .name('CRON Parser');
commander
    .command('inputExpression')
    .description('Input a CRON expression')
    .action(function () {
    console.log('AHOY M8Y');
});
