
import ExpressionInterface from './ExpressionInterface';
import * as tf from './transform-functions';

export default class ExpressionParser {
  parsedExpression: ExpressionInterface;
  expArr: string[];

  constructor(expression: string) {
    this.expArr = this.splitExpression(expression);
    this.parsedExpression = {
      minutes: tf.transform('minutes', this.expArr[0]) || '',
      hours: tf.transform('hours', this.expArr[1]) || '',
      dayMonth: tf.transform('dayMonth', this.expArr[2]) || '',
      month: tf.transform('month', this.expArr[3]) || '',
      dayWeek: tf.transform('dayWeek', this.expArr[4]) || '',
      command: this.expArr[5]
    }
  }

  splitExpression(expression: string) {
    expression = expression.substr(1).slice(0, -1);
    const expArr = expression.split(' ');
    return expArr;
  }

  getParsedExpression() {
    return this.parsedExpression;
  }
}
