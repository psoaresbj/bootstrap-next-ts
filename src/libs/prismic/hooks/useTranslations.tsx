import { DataContext } from '../components/DataProvider';
import React from 'react';
import bracked from '../utils/bracked';

const isProduction = process.env.NODE_ENV === 'production';

const useTranslations = ({ list } = { list: false }) => {
  const { config } = React.useContext(DataContext);
  const strings = config?.translation_strings || {};

  if (list && !isProduction) {
    // eslint-disable-next-line no-console
    console.log('%c \nCommon Strings\n', 'color: #FC00E8;', strings);
  }

  const t = (key: any, variables = {}) => bracked(strings[key] || key, variables);

  return { strings, t };
};

export default useTranslations;
