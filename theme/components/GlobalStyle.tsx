import { colors, fonts } from '../variables';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }

  html,
  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  html {
    overflow-x: hidden;

    &.modal-open {
      overflow-y: hidden;
    }
  }

  body {
    color: ${colors.n06};
    font-family: "${fonts.families.sans}", sans-serif;
    font-weight: ${fonts.weights.regular};
  }

  a {
    outline: 0;
    text-decoration: none;

    &:active,
    &:focus,
    &:hover {
      outline: 0;
    }

    &:not(:disabled) {
      cursor: pointer;
    }
  }
`;

export default GlobalStyle;
