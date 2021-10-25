/* eslint-disable no-console */
const responder = require('./util/responder');
const auth = require('./util/auth');
const controllers = require('../controllers');

module.exports.handler = (event, context, callback) => {
  console.log('event', event);
  console.log('event.headers.Host', event.headers.Host);
  controllers(responder(callback)).openIdConfiguration(
    auth.getIssuer(
      event.headers.Host,
      event.requestContext && event.requestContext.stage
    )
  );
};
