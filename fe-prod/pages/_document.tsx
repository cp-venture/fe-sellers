import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import favicons from "reaction-custom/favicons";
import theme from "reaction-custom/reactionTheme";
import analyticsProviders from "../reaction-custom/analytics";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const links = [
      { rel: "canonical", href: process.env.CANONICAL_URL },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Lato:400,700%7CPoppins:700&display=swap" },
      ...favicons
    ];
    const meta = [
      // Use minimum-scale=1 to enable GPU rasterization
      {
        name: "viewport",
        content: "user-scalable=0, initial-scale=1 minimum-scale=1, width=device-width, height=device-height"
      },
      // PWA primary color
      {
        name: "theme-color",
        content: theme.palette.primary.main
      }
    ];

    // Analytics & Stripe Elements scripts
    const scripts = [
      ...analyticsProviders.map((provider) => ({
        type: "text/javascript",
        innerHTML: provider.renderScript()
      })),
      {
        type: "text/javascript",
        src: "https://js.stripe.com/v3/"
      }
    ];

    return (
      <Html lang="en">
        <Head>
          {meta.map((tag, index) => <meta key={index} {...tag} />)}
          {links.map((link, index) => <link key={index} {...link} />)}
        </Head>
        <body>
          <Main />
          <NextScript />
          {scripts.map((script, index) => (script.innerHTML ? /* eslint-disable-next-line */
            <script async key={index} type={script.type} dangerouslySetInnerHTML={{ __html: script.innerHTML }} /> : <script async key={index} {...script} />))}
        </body>
      </Html>
    );
  }
}
