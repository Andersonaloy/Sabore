
const NextFederationPlugin = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'cardapio',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Cardapio': './components/Cardapio.js',
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
