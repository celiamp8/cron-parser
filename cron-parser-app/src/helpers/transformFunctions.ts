import values from './allowedValues';

const regex = /^[0-9*\-,\/?]*$/;

export const transform = (type: string, range: string, incr?: number) => {
  let increment = incr || 1;
  let min = values[type].min_val;
  let max = values[type].max_val;

  if (!regex.test(range)) {
    return 'ERROR: Invalid expression';
  }
  else {
    // Case for value '?': Return 'Any'
    if (range === '?') {
      return 'Any';
    }
    // Case for specified increments: Remove it from the expression and pass it as a parameter
    else if (range.includes('/')) {
      const parts = range.split('/', 2);
      const newIncrement = parseInt(parts[1].toString());
      if (newIncrement < 1 || newIncrement == undefined || newIncrement > values[type].max_val) {
        return 'ERROR: Increment out of range';
      } else {
        const newRange = parts[0].toString();
        const newExpression: string = transform(type, newRange, newIncrement);
        return newExpression;
      }
    }
    // Case for intervals separated by '-': Set the appropiate min/max values and loop through them
    else if (range.includes('-')) {
      const parts = range.split('-', 2);
      const newValuesArr = parseDashInterval(type, parts[0].toString(), parts[1].toString());
      min = parseInt(newValuesArr[0]);
      max = parseInt(newValuesArr[1]);

      if (min > max || min < values[type].min_val || min > values[type].max_val) {
        return 'ERROR: First input of interval out of range';
      } else if (max < min || max < values[type].min_val || max > values[type].max_val) {
        return 'ERROR: Last input of interval out of range';
      } else {
        return loopFromIncrement(min, max, increment);
      }
    }
    // Case for value '*' with/without increment: Leave max and min as default by type
    else if (range === '*') {
      return loopFromIncrement(min, max, increment);
    }
    // Case for comma separated values: Return in a string separated by spaces
    else if (range.includes(',')) {
      return parseCommaSeparated(type, range);
    }
    // Default case for numeric inputs
    else {
      if (parseInt(range) >= values[type].min_val && parseInt(range) <= values[type].max_val) {
        return range;
      } else {
        return 'ERROR: Input out of range';
      }
    }
  }
}

const parseDashInterval = (type: string, num1: any, num2: any) => {
  let minMaxArr = [];
  num1 === '*' ? minMaxArr.push(values[type].min_val) : minMaxArr.push(num1);
  num2 === '*' ? minMaxArr.push(values[type].max_val) : minMaxArr.push(num2);
  return minMaxArr;
}

const parseCommaSeparated = (type: string, range: string) => {
  let err = false;
  const parts = range.split(',');
  parts.forEach(part => {
    if (parseInt(part) < values[type].min_val || parseInt(part) > values[type].max_val) {
      err = true;
    }
  });
  if (err) {
    return 'ERROR: Some of the provided values are invalid';
  } else {
    return parts.join(' ');
  }
}

const loopFromIncrement = (min: number, max: number, increment: number): string => {
  let totalArr = [];
  for (let i = min; i <= max; i += increment) {
    totalArr.push(i);
  }
  return totalArr.join(' ').toString();
}