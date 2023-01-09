import { GeneratedProps } from '../types';
import { generateProps } from '@psoares/styled-utils';
import styled from 'styled-components';

const Section = styled.section<GeneratedProps>`
  position: relative;

  ${generateProps};
`;

export default Section;
