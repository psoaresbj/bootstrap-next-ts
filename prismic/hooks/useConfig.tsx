import { DataContext } from '../components/DataProvider';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import extractFromData from '../utils/extractFromData';

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = process.env.NEXT_PUBLIC_URL;

const useConfig = ({ list } = { list: false }) => {
  const { config } = React.useContext(DataContext);
  const { asPath } = useRouter();

  const url = useMemo<string>(() => {
    const path = `${asPath}`.replace('//', '/');

    return `${baseUrl}${path}`;
  }, [asPath]);

  if (list && !isProduction) {
    // eslint-disable-next-line no-console
    console.log('%c \nConfig data\n', 'color: #00F496;', config);
  }

  const extract = <T extends { [key: string]: any } | undefined>(name: string, snakeCase?: boolean): T =>
    extractFromData(config || {}, name, snakeCase) as T;

  return { ...(config as { [key: string]: any }), extract, url };
};

export default useConfig;
