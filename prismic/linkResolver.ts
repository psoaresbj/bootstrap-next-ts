import { PrismicDocument } from '@prismicio/types';

export const linkResolver = (doc: PrismicDocument): any => {
  const { type, uid } = doc;

  if (type === 'page' && uid === 'homepage') {
    return '/';
  }

  return '/';
};
