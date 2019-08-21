import values from './allowed-values';
import ExpressionInterface from './ExpressionInterface';

export const parseExpression = (expression: string) => {
  if (validateCron(expression) == true) {
    return splitExpression(expression.toString());
  } else {
    return 'ERROR: Empty expression';
  }
}

const validateCron = (expression: string) => {
  return expression !== undefined || expression !== '';
}

const splitExpression = (expression: string) => {
  expression = expression.substr(1).slice(0, -1);
  const expArr = expression.split(' ');

  let parsedExp: ExpressionInterface = {
    minutes: transform('minutes', expArr[0]),
    hours: transform('hours', expArr[1]),
    dayMonth: transform('dayMonth', expArr[2]),
    month: transform('month', expArr[3]),
    dayWeek: transform('dayWeek', expArr[4]),
    command: expArr[5]
  };
  return parsedExp;
}

const transform = (type: any, range: string) => {
  if (range === '*') {
    const min: number = values[type].min_val;
    const max: number = values[type].max_val;
    return loopFrom(min, max, 1);
  } else {
    return range;
  }
}

const loopFrom = (min: number, max: number, interval: number): string => {
  let totalArr = [];

  for (let i = min; i <= max; i += interval) {
    totalArr.push(i);
  }

  return totalArr.join(' ').toString();
}