import { css } from 'styled-components';

export const hideScrollbar = css`
  -ms-overflow-style: none;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const unsetHiddenScrollbar = css`
  -ms-overflow-style: unset;

  scrollbar-width: unset;

  &::-webkit-scrollbar {
    display: unset;
  }
`;
