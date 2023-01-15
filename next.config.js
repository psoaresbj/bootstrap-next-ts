const localesConfig = require('./locales-config.json');

const defaultLocale = localesConfig.find(({ isDefault }) => isDefault)?.code;
const locales = localesConfig.map(({ code }) => code);

const nextConfig = {
  i18n: {
    defaultLocale,
    locales
  },
  reactStrictMode: true
};

module.exports = nextConfig;
