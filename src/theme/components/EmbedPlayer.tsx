import { position, size } from 'polished';
import styled from 'styled-components';

const EmbedPlayer = styled.div`
  padding-top: 56.25%;
  position: relative;
  width: 100%;

  iframe {
    ${position('absolute', 0)};
    ${size('100%')};
  }
`;

export default EmbedPlayer;
