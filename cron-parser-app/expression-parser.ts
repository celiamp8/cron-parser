import values from './allowed-values';
import ExpressionInterface from './ExpressionInterface';

export const parseExpression = (expression: string) => {
  if (validateCron(expression) == true) {
    let expArr = splitExpression(expression);
    let parsedExp: ExpressionInterface = {
      minutes: transform('minutes', expArr[0]) || '',
      hours: transform('hours', expArr[1]) || '',
      dayMonth: transform('dayMonth', expArr[2]) || '',
      month: transform('month', expArr[3]) || '',
      dayWeek: transform('dayWeek', expArr[4]) || '',
      command: expArr[5]
    };
    return parsedExp;
  } else {
    return 'ERROR: Invalid expression!';
  }
}

const validateCron = (expression: string) => {
  return expression !== undefined || expression !== '';
}

const splitExpression = (expression: string) => {
  expression = expression.substr(1).slice(0, -1);
  const expArr = expression.split(' ');
  return expArr;
}

const transform = (type: string, range: string, incr?: number) => {
  let increment = incr || 1;
  let min = values[type].min_val;
  let max = values[type].max_val;

  // Case for value '?': Return 'Any'
  if (range === '?') {
    return 'Any';
  }
  // Case for specified increments: Remove it from the expression and pass it as a parameter
  else if (range.includes('/')) {
    const parts = range.split('/', 2);
    const newIncrement = parseInt(parts[1].toString());
    const newRange = parts[0].toString();
    const newExpression: string = transform(type, newRange, newIncrement);
    return newExpression;
  }
  // Case for intervals separated by '-': Set the appropiate min/max values and loop through them
  else if (range.includes('-')) {
    const parts = range.split('-', 2);
    const newValuesArr = parseDashInterval(type, parts[0].toString(), parts[1].toString());
    min = parseInt(newValuesArr[0]);
    max = parseInt(newValuesArr[1]);
    return loopFromIncrement(min, max, increment);
  }
  // Case for value '*' with/without increment: Leave max and min as default by type
  else if (range === '*') {
    return loopFromIncrement(min, max, increment);
  }
  // Case for comma separated values: Return in a string separated by spaces
  else if (range.includes(',')) {
    const parts = range.split(',');
    return parts.join(' ');
  }
  // Default case for numeric inputs
  else {
    return range;
  }
}

const parseDashInterval = (type: string, num1: any, num2: any) => {
  let minMaxArr = [];
  num1 === '*' ? minMaxArr.push(values[type].min_val) : minMaxArr.push(num1);
  num2 === '*' ? minMaxArr.push(values[type].max_val) : minMaxArr.push(num2);
  return minMaxArr;
}

const loopFromIncrement = (min: number, max: number, increment: number): string => {
  let totalArr = [];
  for (let i = min; i <= max; i += increment) {
    totalArr.push(i);
  }
  return totalArr.join(' ').toString();
}