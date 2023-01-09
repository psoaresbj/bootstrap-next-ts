import { css } from 'styled-components';

/* eslint-disable no-nested-ternary */
export const flex = (vAlign = 'start', hAlign = 'start', direction = 'row', inline = false) => css`
  align-items: ${direction === 'row' || direction === 'row-reverse'
    ? vAlign === 'center'
      ? 'center'
      : `flex-${vAlign}`
    : hAlign === 'center'
    ? 'center'
    : `flex-${hAlign}`};
  display: ${inline ? 'inline-flex' : 'flex'};
  flex-direction: ${direction};
  justify-content: ${direction === 'row' || direction === 'row-reverse'
    ? hAlign === 'center'
      ? 'center'
      : `flex-${hAlign}`
    : vAlign === 'center'
    ? 'center'
    : `flex-${vAlign}`};
`;

export const flexList = { center: 'center center', centerLeft: 'center start', centerRight: 'center end' };
