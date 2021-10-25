import * as sst from '@serverless-stack/resources';

// export LINKEDIN_CLIENT_ID=e049ba5bcab28d595dc6
// export LINKEDIN_CLIENT_SECRET=746cf476d723d71b7fdaf203e7a9efa40a53af80
// export COGNITO_REDIRECT_URI=https://alpaca-backend-staging.auth.ap-southeast-1.amazoncognito.com/oauth2/idpresponse
// export LINKEDIN_API_URL=https://api.github.com
// export LINKEDIN_LOGIN_URL=https://github.com

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create the HTTP API
    const api = new sst.Api(this, 'Api', {
      defaultFunctionProps: {
        timeout: 20,
        environment: {
          LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
          LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
          COGNITO_REDIRECT_URI: process.env.COGNITO_REDIRECT_URI,
          LINKEDIN_API_URL: process.env.LINKEDIN_API_URL,
          LINKEDIN_LOGIN_URL: process.env.LINKEDIN_LOGIN_URL,
          LINKEDIN_SCOPE: process.env.LINKEDIN_SCOPE,
        },
      },
      routes: {
        'GET /.well-known/openid-configuration': 'dist-lambda/openIdConfiguration.handler',
        'GET /authorize': 'dist-lambda/authorize.handler',
        'GET /token': 'dist-lambda/token.handler',
        'POST /token': 'dist-lambda/token.handler',
        'GET /userinfo': 'dist-lambda/userinfo.handler',
        'POST /userinfo': 'dist-lambda/userinfo.handler',
        'GET /.well-known/jwks.json': 'dist-lambda/jwks.handler',
      },
    });

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}
