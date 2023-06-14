// eslint-disable-next-line import/no-unresolved
import { ISitemapField, getServerSideSitemapLegacy } from 'next-sitemap';
import { PrismicDocument } from '@prismicio/types';
import { createClient } from '../libs/prismic/createClient';
import localesConfig from '../../locales-config.json';
import routes from '../libs/prismic/routes';

// EDIT: Set a map for exceptions
const pageTypeMap: { path: string; type: string }[] = [
  ...routes.map(({ path, ...route }) => ({ ...route, path: path.replace('/:lang', '') })),
  { path: '/work', type: 'work' }
];

// Get the default lang
const defaultLang = (localesConfig || []).find(({ isDefault }) => isDefault)?.code || 'en-eu';

const getFields = (document: PrismicDocument) => {
  try {
    const path = pageTypeMap
      .find(({ type }) => type === document?.type)
      ?.path?.replace(':uid', document?.uid as string);

    return (document?.alternate_languages || []).reduce(
      (result, { lang }) => [
        ...result,
        {
          lastmod: new Date().toISOString(),
          loc: `${process.env.NEXT_PUBLIC_URL}/${lang}${path}`
        }
      ],
      [
        {
          lastmod: new Date().toISOString(),
          loc: `${process.env.NEXT_PUBLIC_URL}${path}`
        }
      ]
    );
  } catch (error) {
    return [];
  }
};

export const getServerSideProps = async (ctx: any) => {
  const pageTypes = pageTypeMap.map(({ type }) => type) as string[];

  const client = await createClient();

  // get all the documents
  const response = (await client.dangerouslyGetAll({ lang: defaultLang })) as PrismicDocument[];

  const documents = response.reduce(
    (result: PrismicDocument[], document: PrismicDocument) =>
      pageTypes.includes(document?.type) ? [...result, document] : result,
    []
  );

  const fields = (documents || []).reduce((result: ISitemapField[], document: PrismicDocument) => {
    return [...result, ...getFields(document)];
  }, []);

  return getServerSideSitemapLegacy(ctx, fields);
};

// Default export to prevent next.js errors
const Sitemap = () => {};

export default Sitemap;
