import { expect } from 'chai';
import ExpressionParser from '../src/expressionParser';

describe('invalid values', function () {
  it('single numbers out of range', function () {
    let result = new ExpressionParser(" 66 24 32 13 0 command/invalid/single ").getFormattedExpression();

    expect(result).equal(
      `Minutes: ERROR: Input out of range
Hours: ERROR: Input out of range
Day of month: ERROR: Input out of range
Month: ERROR: Input out of range
Day of week: ERROR: Input out of range
Command: command/invalid/single`
    );
  });

  it('interval first values out of range', function () {
    let result = new ExpressionParser(" 60-3 55-* 30-10 6-3 0-1 command/invalid/firstinterval ").getFormattedExpression();

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
    let result = new ExpressionParser(" 20-95 *-79 20-89 1-15 *-70 command/invalid/lastinterval ").getFormattedExpression();

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
    let result = new ExpressionParser(" [] (9-14) */sth 1-5= etc command/invalid/nonexpected ").getFormattedExpression();

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