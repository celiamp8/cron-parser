import { expect } from 'chai';
import ExpressionParser from '../src/expressionParser';

describe('invalid values', function () {
  it('single numbers out of range', function () {
    // Given input number out of the allowed values range
    const expString = " 66 24 32 13 0 command/invalid/single ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output 'ERROR: Input out of range'
    expect(result).equal(
      `Minutes: ERROR: Input out of range
Hours: ERROR: Input out of range
Day of month: ERROR: Input out of range
Month: ERROR: Input out of range
Day of week: ERROR: Input out of range
Command: command/invalid/single`
    );
  });

  it('comma separated numbers out of range', function () {
    // Given input one or many invalid values in comma separated list
    const expString = " 4,33,77 90,100,300,400 3,35 0,7 8,1 command/invalid/comma ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output 'ERROR: Some of the provided values are invalid'
    expect(result).equal(
      `Minutes: ERROR: Some of the provided values are invalid
Hours: ERROR: Some of the provided values are invalid
Day of month: ERROR: Some of the provided values are invalid
Month: ERROR: Some of the provided values are invalid
Day of week: ERROR: Some of the provided values are invalid
Command: command/invalid/comma`
    );
  });

  it('interval first values out of range', function () {
    // Given input value out of allowed range as first in an interval
    const expString = " 60-3 55-* 30-10 6-3 0-1 command/invalid/firstinterval ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output 'ERROR: First input of interval out of range'
    expect(result).equal(
      `Minutes: ERROR: First input of interval out of range
Hours: ERROR: First input of interval out of range
Day of month: ERROR: First input of interval out of range
Month: ERROR: First input of interval out of range
Day of week: ERROR: First input of interval out of range
Command: command/invalid/firstinterval`
    );
  });

  it('interval last values out of range', function () {
    // Given input value out of allowed range as last in an interval
    const expString = " 20-95 *-79 20-89 1-15 *-70 command/invalid/lastinterval ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output 'ERROR: Last input of interval out of range'
    expect(result).equal(
      `Minutes: ERROR: Last input of interval out of range
Hours: ERROR: Last input of interval out of range
Day of month: ERROR: Last input of interval out of range
Month: ERROR: Last input of interval out of range
Day of week: ERROR: Last input of interval out of range
Command: command/invalid/lastinterval`
    );
  });

  it('non expected characters', function () {
    // Given input not allowed characters (chars other than 0-9 , * / and ?)
    const expString = " [] (9-14) */sth 1-5= etc command/invalid/nonexpected ";
    // When parse expression
    let result = new ExpressionParser(expString).getFormattedExpression();
    // Then output 'ERROR: Invalid expression'
    expect(result).equal(
      `Minutes: ERROR: Invalid expression
Hours: ERROR: Invalid expression
Day of month: ERROR: Invalid expression
Month: ERROR: Invalid expression
Day of week: ERROR: Invalid expression
Command: command/invalid/nonexpected`
    );
  });
});