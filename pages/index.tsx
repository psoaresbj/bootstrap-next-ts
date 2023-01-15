import type { GetStaticProps } from 'next';

import { createClient } from '../prismic/createClient';
import { getConfig } from '../prismic/api/getConfig';
import Page from '../page-components/Page';

export const getStaticProps: GetStaticProps = async ({ locale, previewData }) => {
  const client = createClient({ previewData });

  const config = await getConfig({ locale, previewData });
  const page = await client.getByUID('page', 'homepage', { lang: locale });

  return { props: { config, page } };
};

export default Page;
