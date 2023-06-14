import { PreviewData } from 'next';
import { createClient } from '../createClient';
import { filter } from '@prismicio/client';

// eslint-disable-next-line no-unused-vars
type GetConfig = (options: { locale?: string; previewData: PreviewData }) => Promise<any>;

// EDIT: set your unique config files
const configDocumentTypes = ['config', 'translation_strings'];

const accessToken = process.env.NEXT_PRISMIC_TOKEN;

export const getConfig: GetConfig = async ({ locale, previewData }) => {
  try {
    const client = createClient({ accessToken, previewData });

    const response = await client.dangerouslyGetAll({
      filters: [filter.any('document.type', configDocumentTypes)],
      lang: locale
    });

    const config = response.reduce(
      (result, { data, type }) => (type === 'config' ? { ...result, ...data } : { ...result, [type]: data }),
      {}
    );

    return config;
  } catch (error) {
    console.log(error);

    return;
  }
};
