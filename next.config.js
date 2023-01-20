const localesConfig = require('./locales-config.json');

const defaultLocale = localesConfig.find(({ isDefault }) => isDefault)?.code;
const locales = localesConfig.map(({ code }) => code);

const nextConfig = {
  compiler: {
    styledComponents: true
  },
  i18n: {
    defaultLocale,
    locales
  },
  reactStrictMode: true
};

module.exports = nextConfig;
