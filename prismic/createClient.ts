import * as config from '../sm.json';
import * as prismic from '@prismicio/client';
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next';

const { apiEndpoint } = config;

const accessToken = process.env.NEXT_PRISMIC_TOKEN;

export const createClient = ({ previewData, req, ...config }: CreateClientConfig = {}) => {
  const client = prismic.createClient(apiEndpoint, { ...config, accessToken });

  enableAutoPreviews({ client, previewData, req });

  return client;
};
