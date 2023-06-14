import { Theme } from 'styled-gen';
import { breakpoints, colors, durations, ease, fonts, generator, grid } from './variables';

const theme: Theme = {
  config: {
    transientPrefix: '$'
  },

  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  breakpoints,
  colors,
  durations,
  ease,
  fonts,
  generator,
  grid
};

export default theme;
