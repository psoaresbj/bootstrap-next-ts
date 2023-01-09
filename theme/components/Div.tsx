import { GeneratedProps } from '../types';
import { generateProps } from '@psoares/styled-utils';
import styled from 'styled-components';

const Div = styled.div<GeneratedProps>`
  ${generateProps}
`;

export default Div;
