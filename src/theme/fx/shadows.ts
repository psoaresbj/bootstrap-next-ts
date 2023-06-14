import { colors } from '../variables';
import { css } from 'styled-components';
import { rgba } from 'polished';

const baseShadow = `0.75rem 0.75rem 1rem ${rgba(colors.n08, 1)}`;

export const shadows = {
  base: css`
    box-shadow: ${baseShadow};
  `,

  strongToLeft: css`
    box-shadow: -${baseShadow}, 0.75rem 0 1rem ${rgba(colors.n06, 0.16)};
  `,

  strongToRight: css`
    box-shadow: ${baseShadow}, -0.75rem 0 1rem ${rgba(colors.n06, 0.16)};
  `
};
