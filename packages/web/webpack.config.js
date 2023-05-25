const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  if (config.devServer && process.env.NX_WEB_APP_URL && process.env.NX_API_HOST && process.env.NX_API_PORT) {
    config.devServer.proxy = {
      '/api': {
        target: `${process.env.NX_API_HOST}:${process.env.NX_API_PORT}`,
        "secure": false
      }
    };
  }

  return config;
});
