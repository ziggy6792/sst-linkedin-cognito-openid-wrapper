/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '../.env' });
import MyStack from './MyStack';

export default function main(app) {
  new MyStack(app, 'stack');

  // Add more stacks
}
