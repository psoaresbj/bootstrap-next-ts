import { SliceZone } from '@prismicio/react';
import { components } from '../slices';
import React from 'react';
import usePage from '../libs/prismic/hooks/usePage';

const Page = () => {
  const { data } = usePage();

  const { slices1 } = data || {};

  return (
    <>
      <SliceZone components={components} slices={slices1} />
    </>
  );
};

export default Page;
