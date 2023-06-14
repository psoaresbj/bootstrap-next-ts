import { PrismicDocument } from '@prismicio/types';
import routes from './routes';

const exceptions = routes.map(({ type }) => type);

// EDIT: Update your paths
export const linkResolver = (doc: PrismicDocument): any => {
  const { type, uid } = doc;

  if (exceptions.includes(doc.type)) {
    return null;
  }

  if (type === 'page' && uid === 'homepage') {
    return '/';
  }

  return '/';
};
