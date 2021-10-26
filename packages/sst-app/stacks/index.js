/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '../.env' });
import OpenIdApi from './openid-api';

export default function main(app) {
  new OpenIdApi(app, 'api');
}
