import * as prismicNext from '@prismicio/next';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createClient } from '../../prismic/createClient';
import { linkResolver } from '../../prismic/linkResolver';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createClient({ req });

  prismicNext.setPreviewData({ req, res });

  await prismicNext.redirectToPreviewURL({ client, linkResolver: linkResolver as any, req, res });
};

export default handler;
