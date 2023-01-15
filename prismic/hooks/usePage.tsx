import { DataContext } from '../components/DataProvider';
import { PrismicDocument } from '@prismicio/types';
import React from 'react';
import extractFromData from '../utils/extractFromData';

const isProduction = process.env.NODE_ENV === 'production';

const usePage = ({ list } = { list: false }) => {
  const { page } = React.useContext(DataContext);

  if (list && !isProduction) {
    // eslint-disable-next-line no-console
    console.log('%c \nPage data\n', 'color: #007AF4;', page);
  }

  const extract = <T extends { [key: string]: any } | undefined>(name: string, snakeCase?: boolean): T =>
    extractFromData(page?.data || {}, name, snakeCase) as T;

  return { ...(page as PrismicDocument), extract };
};

export default usePage;
