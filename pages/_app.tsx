import { AppProps } from 'next/app';
import { DataProvider } from '../prismic/components/DataProvider';
import { Main } from '../theme/components/Main';
import { ModalProvider } from '../modals/ModalProvider';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/components/GlobalStyle';
import Header from '../components/Header';
import SEO from '../page-components/SEO';
import gilroy from '../fonts/gilroy';
import theme from '../theme';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const { config, page, ...forwardProps } = pageProps || {};

  if (!page && !config) {
    return <Component {...pageProps} />;
  }

  return (
    <DataProvider config={{ ...config, ...forwardProps }} page={page}>
      <div className={gilroy.className}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <GlobalStyle />
            <Header />
            <Main>
              <SEO />
              <Component />
            </Main>
          </ModalProvider>
        </ThemeProvider>
      </div>
    </DataProvider>
  );
};

export default App;
