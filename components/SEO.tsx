import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import useConfig from '../prismic/hooks/useConfig';
import usePage from '../prismic/hooks/usePage';

type MetaImage = string | { url?: string };

type Meta = {
  description?: string;
  image?: MetaImage;
  keywords?: string;
  title?: string;
  url?: string;
};

type MetaObject = {
  content: string;
  name?: string;
  property?: string;
};

type SEOProps = {
  defaultTitle?: string;
  meta?: Meta;
};

const parseMetaData = (metaData?: Meta) =>
  Object.entries(metaData || {}).reduce((meta: any, [metaName, metaValue]): MetaObject[] => {
    if (!metaValue) {
      return meta;
    }

    if (metaName === 'image') {
      const imageUrl = typeof metaValue === 'string' ? metaValue : metaValue?.url;

      if (!imageUrl) {
        return meta;
      }

      return [
        ...meta,
        { content: imageUrl, property: `og:${metaName}` },
        { content: imageUrl, property: `og:${metaName}:secure_url` },
        { content: imageUrl, name: `twitter:${metaName}` }
      ];
    }

    if (metaName === 'keywords') {
      return [...meta, { content: metaValue, name: metaName }];
    }

    if (metaName === 'title') {
      return [
        ...meta,
        { content: metaValue, property: `og:${metaName}` },
        { content: metaValue, name: `twitter:${metaName}` }
      ];
    }

    if (metaName === 'url') {
      return [...meta, { content: metaValue, property: `og:${metaName}` }];
    }

    return [
      ...meta,
      { content: metaValue, name: metaName },
      { content: metaValue, name: `twitter:${metaName}` },
      { content: metaValue, property: `og:${metaName}` }
    ];
  }, []);

const SEO = (props: SEOProps) => {
  const { defaultTitle, meta } = props;

  const router = useRouter();
  const { extract: extractFromPage } = usePage();
  const { extract: extractFromConfig, url } = useConfig();

  const { locale } = router;

  const metaFromConfig = pickBy(extractFromConfig('seo'), prop => !isEmpty(prop));
  const metaFromPage = pickBy(extractFromPage('seo'), prop => !isEmpty(prop));
  const metaFromProps = pickBy(meta, prop => !isEmpty(prop));

  const mergedMeta = { ...metaFromConfig, ...metaFromPage, ...metaFromProps, url } as Meta;
  const metaArr = parseMetaData(mergedMeta) as MetaObject[];

  const title = mergedMeta?.title || defaultTitle;

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    window.__localeId__ = locale;
  }, [locale]);

  return (
    <Head>
      <title>{title}</title>
      {metaArr.map((itemProps, index) => (
        <meta key={index} {...itemProps} />
      ))}
    </Head>
  );
};

SEO.defaultProps = { defaultTitle: null, meta: {} };

export default SEO;
