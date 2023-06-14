/** @type {import('next-sitemap').IConfig} */

module.exports = {
  exclude: ['/admin', '/server-sitemap.xml'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_URL}/server-sitemap.xml`]
  },
  siteUrl: process.env.NEXT_PUBLIC_URL
};
