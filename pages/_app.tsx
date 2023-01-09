import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/components/GlobalStyle';
import gilroy from '../fonts/gilroy';
import theme from '../theme';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <main className={gilroy.className}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
};

export default App;
