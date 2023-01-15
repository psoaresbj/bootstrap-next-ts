import { GeneratedProps, VariationProps } from '../types';
import { generateProps, variations } from '@psoares/styled-utils';
import { mq } from '../utils';
import styled, { css } from 'styled-components';

const spacingVariations = {
  default: css`
    margin-top: 4rem;

    ${mq.sm(css`
      margin-top: 7.5rem;
    `)}
  `,

  lg: css`
    margin-top: 8.75rem;

    ${mq.sm(css`
      margin-top: 15rem;
    `)}
  `,

  sm: css`
    margin-top: 2rem;

    ${mq.sm(css`
      margin-top: 4rem;
    `)}
  `
};

const Section = styled.section<VariationProps<typeof spacingVariations> & GeneratedProps>`
  position: relative;

  ${variations(spacingVariations)};
  ${generateProps};
`;

export default Section;
