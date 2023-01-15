import type { PrismicDocument } from '@prismicio/types';

import PropTypes from 'prop-types';
import React, { createContext } from 'react';

type Data = {
  config: { [key: string]: any };
  page?: PrismicDocument;
};

const initialData = { config: {} };

export const DataContext = createContext<Data>(initialData);

type DataProviderProps = {
  children: React.ReactNode;
} & Data;

export const DataProvider = (props: DataProviderProps) => {
  const { children, config, page } = props;

  return <DataContext.Provider value={{ config, page }}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.object,
  page: PropTypes.object
};

DataProvider.defaultProps = {
  config: {},
  page: {}
};

export const DataConsumer = DataContext.Consumer;
