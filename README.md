# CRON Expression Parser

The following program parses a CRON expression in the format `" */15 0 1,15 * 1-5 /usr/bin/find "` to a text output:
```bash
Minutes: 0 15 30 45
Hours: 0
Day of month: 1 15
Month: 1 2 3 4 5 6 7 8 9 10 11 12
Day of Week: 1 2 3 4 5
Command: /usr/bin/find
```

## Installation

1. Clone the repository
2. You'll need node and npm installed in your machine
3. Run the following command:

```bash
npm install
```

## Execution

To convert your own expressions, you'll need to run the following command in the terminal:
```bash
npx ts-node index.ts cp XXX
```
where "XXX" is a CRON expression such as:
```shell
npx ts-node index.ts cp " 30 0-19 */8 1-5/2 ? mycommand "
```

## Test

To run the tests, use:
```shell
npm run test
```

## Implementation details
This project has been developed in Typescript with [Command.js](https://github.com/tj/commander.js) for interacting with the node terminal.

The tests are done in Mocha with Chai assertions.

The project is structured in `src` and `tests` folders, containing the application code and tests respectively. The `src` folder contains a `helper` folder in which I've separated the expression transform functions and interfaces for more clarity of code.