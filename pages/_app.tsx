import { AppProps } from 'next/app';
import { DataProvider } from '../prismic/components/DataProvider';
import { Main } from '../theme/components/Main';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/components/GlobalStyle';
import Header from '../components/Header';
import SEO from '../prismic/components/SEO';
import gilroy from '../fonts/gilroy';
import theme from '../theme';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const { config, page, ...forwardProps } = pageProps || {};

  return (
    <DataProvider config={{ ...config, ...forwardProps }} page={page}>
      <main className={gilroy.className}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header />
          <Main>
            <SEO />
            <Component />
          </Main>
        </ThemeProvider>
      </main>
    </DataProvider>
  );
};

export default App;
