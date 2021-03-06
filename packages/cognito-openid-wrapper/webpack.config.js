const path = require('path');

const baseConfig = {
  mode: 'development',
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(key|key.pub)$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      }
    ]
  }
};

const config = [
  {
    ...baseConfig,
    output: {
      libraryTarget: 'commonjs2',
      path: path.join(
        require.resolve('@sst-openid-wrapper/sst-app'),
        '..',
        '..',
        '/dist-lambda'
      ),
      filename: '[name].js'
    },
    entry: {
      openIdConfiguration: './src/connectors/lambda/open-id-configuration.js',
      token: './src/connectors/lambda/token.js',
      userinfo: './src/connectors/lambda/userinfo.js',
      jwks: './src/connectors/lambda/jwks.js',
      authorize: './src/connectors/lambda/authorize.js'
    }
  },
  {
    ...baseConfig,
    output: {
      libraryTarget: 'commonjs2',
      path: `${__dirname}/dist-lambda`,
      filename: '[name].js'
    },
    entry: {
      openIdConfiguration: './src/connectors/lambda/open-id-configuration.js',
      token: './src/connectors/lambda/token.js',
      userinfo: './src/connectors/lambda/userinfo.js',
      jwks: './src/connectors/lambda/jwks.js',
      authorize: './src/connectors/lambda/authorize.js'
    }
  }
];

module.exports = config;
