import { expect } from 'chai';
import ExpressionParser from '../src/expressionParser';

describe('valid values', function () {
  it('single values', function () {
    // Given input of single value
    const expString = " 30 13 8 1 3 command/single ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output single value
    expect(result).equal(
      `Minutes: 30
Hours: 13
Day of month: 8
Month: 1
Day of week: 3
Command: command/single`
    );
  });

  it('all', function () {
    // Given input of *
    const expString = " * * * * * command/all ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output all possible values
    expect(result).equal(
      `Minutes: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59
Hours: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
Day of month: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
Month: 1 2 3 4 5 6 7 8 9 10 11 12
Day of week: 1 2 3 4 5 6 7
Command: command/all`
    );
  });

  it('any', function () {
    // Given input of ?
    const expString = " ? ? ? ? ? command/any ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output 'Any'
    expect(result).equal(
      `Minutes: Any
Hours: Any
Day of month: Any
Month: Any
Day of week: Any
Command: command/any`
    );
  });

  it('intervals', function () {
    // Given input of intervals
    const expString = " *-12 4-16 3-30 2-7 4-5 command/intervals ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output of all nums in interval including first and last
    expect(result).equal(
      `Minutes: 0 1 2 3 4 5 6 7 8 9 10 11 12
Hours: 4 5 6 7 8 9 10 11 12 13 14 15 16
Day of month: 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
Month: 2 3 4 5 6 7
Day of week: 4 5
Command: command/intervals`
    );
  });

  it('increments', function () {
    // Given input with increment
    const expString = " */20 4-22/10 *-29/3 */6 3-*/2 command/increments ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output expected values looped with given increment
    expect(result).equal(
      `Minutes: 0 20 40
Hours: 4 14
Day of month: 1 4 7 10 13 16 19 22 25 28
Month: 1 7
Day of week: 3 5 7
Command: command/increments`
    );
  });

  it('comma separated values', function () {
    // Given comma separated values
    const expString = " 1,15,30 4,5,6 7,30 3,4,5,8,9,11 5,6 command/comma ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output values in the given order separated by space
    expect(result).equal(
      `Minutes: 1 15 30
Hours: 4 5 6
Day of month: 7 30
Month: 3 4 5 8 9 11
Day of week: 5 6
Command: command/comma`
    );
  });

  it('multiple values', function () {
    // Given a combination of intervals and increments
    const expString = " 1-40 */5 3-*/2 *-4 ? command/multivals ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output values in interval looped with given increment
    expect(result).equal(
      `Minutes: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40
Hours: 0 5 10 15 20
Day of month: 3 5 7 9 11 13 15 17 19 21 23 25 27 29 31
Month: 1 2 3 4
Day of week: Any
Command: command/multivals`
    );
  });

  it('all with manual intervals', function () {
    // Given input all possible values with intervals
    const expString = " 0-59 0-23 *-31 1-* 1-7 command/allmanual ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output all possible values 
    expect(result).equal(
      `Minutes: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59
Hours: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
Day of month: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
Month: 1 2 3 4 5 6 7 8 9 10 11 12
Day of week: 1 2 3 4 5 6 7
Command: command/allmanual`
    );
  });
});