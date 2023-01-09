import { ServerStyleSheet } from 'styled-components';
import { favicons } from '../constants';
import Document, { Head, Html, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="/manifest.json" rel="manifest" />

          {favicons.map(
            ({ size, rel }, index) =>
              rel &&
              !!size && (
                <link
                  href={`/img/${size === 32 ? 'favicon' : `touch-icon-${size}x${size}`}.png`}
                  key={index}
                  rel={rel}
                  type="image/png"
                />
              )
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
