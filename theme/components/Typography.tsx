/* eslint-disable no-nested-ternary */
import { GeneratedProps, VariationProps } from '../types';
import { Variations, generateProps, variations } from '@psoares/styled-utils';
import { fonts, typography } from '../variables';
import { getTypographySizeVariations } from '../helpers/getTypographySizeVariations';
import getTag from '../helpers/getTag';
import styled, { css } from 'styled-components';

const miscVariations = {
  ellipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
};

type TypographyType<T extends Variations> = GeneratedProps & VariationProps<typeof miscVariations> & VariationProps<T>;

const [headingSizeVariations, bodySizeVariations, labelSizeVariations] = Object.entries(typography).map(([, sizes]) =>
  getTypographySizeVariations(sizes)
);

export const Heading = styled.h1.attrs((props: any) => ({
  as: (props?.as as string) || getTag(props, { defaultTag: 'h1' })
}))<TypographyType<typeof typography.heading>>`
  font-weight: ${fonts.weights.black};
  text-transform: uppercase;

  ${variations(headingSizeVariations)};
  ${variations(miscVariations)};
  ${generateProps};
`;

export const Text = styled.div.attrs((props: any) => ({
  as: (props?.as as string) || getTag(props, { defaultTag: 'div' })
}))<TypographyType<typeof typography.body>>`
  ${variations(bodySizeVariations)};
  ${variations(miscVariations)};
  ${generateProps};
`;

export const Label = styled.div.attrs((props: any) => ({
  as: (props?.as as string) || getTag(props, { defaultTag: 'span' })
}))<TypographyType<typeof typography.label>>`
  display: inline-block;
  font-weight: ${fonts.weights.black};
  letter-spacing: 0.1em;
  text-transform: uppercase;

  ${variations(labelSizeVariations)};
  ${variations(miscVariations)};
  ${generateProps};
`;
