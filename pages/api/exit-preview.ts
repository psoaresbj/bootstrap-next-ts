import * as prismicNext from '@prismicio/next';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await prismicNext.exitPreview({ req, res });
};

export default handler;
