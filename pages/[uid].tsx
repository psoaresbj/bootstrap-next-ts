import type { GetStaticPaths, GetStaticProps } from 'next';

import { createClient } from '../prismic/createClient';
import { getConfig } from '../prismic/api/getConfig';
import Page from '../page-components/Page';

export const getStaticProps: GetStaticProps<{}, { uid: string }> = async ({ locale, params, previewData }) => {
  const { uid } = params as any;
  const client = createClient({ previewData });

  const config = await getConfig({ locale, previewData });
  const page = await client.getByUID('page', uid, { lang: locale });

  return {
    props: {
      config,
      page
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createClient();

  const pages = await client.getAllByType('page', { lang: '*' });

  return {
    fallback: false,
    paths: pages.reduce((result: any, page) => {
      const { lang, uid } = page || {};

      if (uid === 'homepage') {
        return result;
      }

      return [
        ...result,
        {
          locale: lang,
          params: { uid }
        }
      ];
    }, [])
  };
};

export default Page;
