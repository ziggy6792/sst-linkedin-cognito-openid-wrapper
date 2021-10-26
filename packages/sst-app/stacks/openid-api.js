import * as sst from '@serverless-stack/resources';
import { Function } from '@serverless-stack/resources';

// export LINKEDIN_CLIENT_ID=e049ba5bcab28d595dc6
// export LINKEDIN_CLIENT_SECRET=746cf476d723d71b7fdaf203e7a9efa40a53af80
// export COGNITO_REDIRECT_URI=https://alpaca-backend-staging.auth.ap-southeast-1.amazoncognito.com/oauth2/idpresponse
// export LINKEDIN_API_URL=https://api.github.com
// export LINKEDIN_LOGIN_URL=https://github.com

export default class OpenIdApi extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const defaultFunctionProps = {
      timeout: 30,
      environment: {
        LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
        LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
        COGNITO_REDIRECT_URI: process.env.COGNITO_REDIRECT_URI,
        LINKEDIN_API_URL: process.env.LINKEDIN_API_URL,
        LINKEDIN_LOGIN_URL: process.env.LINKEDIN_LOGIN_URL,
        LINKEDIN_SCOPE: process.env.LINKEDIN_SCOPE,
      },
    };

    // Lambda functions
    const openidConfiguration = new Function(this, 'configuration', { handler: 'dist-lambda/openIdConfiguration.handler', ...defaultFunctionProps });
    const authorize = new Function(this, 'authorize', { handler: 'dist-lambda/authorize.handler', ...defaultFunctionProps });
    const token = new Function(this, 'token', { handler: 'dist-lambda/token.handler', ...defaultFunctionProps });
    const userinfo = new Function(this, 'userinfo', { handler: 'dist-lambda/userinfo.handler', ...defaultFunctionProps });
    const jwks = new Function(this, 'jwks', { handler: 'dist-lambda/jwks.handler', ...defaultFunctionProps });

    // Create the HTTP API
    const api = new sst.Api(this, 'Api', {
      routes: {
        'GET /.well-known/openid-configuration': openidConfiguration,
        'GET /authorize': authorize,
        'GET /token': token,
        'POST /token': token,
        'GET /userinfo': userinfo,
        'POST /userinfo': userinfo,
        'GET /.well-known/jwks.json': jwks,
      },
    });

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}
