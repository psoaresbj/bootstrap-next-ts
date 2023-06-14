import * as config from '../../../slicemachine.config.json';
import * as prismic from '@prismicio/client';
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next';
import routes from './routes';

const { apiEndpoint } = config;

const accessToken = process.env.NEXT_PRISMIC_TOKEN;

export const createClient = ({ previewData, req }: CreateClientConfig = {}) => {
  const client = prismic.createClient(apiEndpoint, { ...config, accessToken, routes });

  enableAutoPreviews({ client, previewData, req });

  return client;
};
