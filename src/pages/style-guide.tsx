import type { GetStaticProps } from 'next';

import { getConfig } from '../libs/prismic/api/getConfig';
import Error from 'next/error';
import React from 'react';
import StyleGuide from '../page-components/StyleGuide';

export const getStaticProps: GetStaticProps = async ({ locale, previewData }) => {
  const config = await getConfig({ locale, previewData });

  return { props: { config } };
};

export default process.env.NODE_ENV !== 'production' ? StyleGuide : () => <Error statusCode={404} />;
