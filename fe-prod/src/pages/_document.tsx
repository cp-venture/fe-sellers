import React, { Fragment } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet as StyledComponentSheets } from "styled-components";
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/styles";
import favicons from "custom/favicons";
import theme from "custom/reactionTheme";
import analyticsProviders from "custom/analytics";

/**
 * For details about the styled-components SSR code in this file, see https://www.styled-components.com/docs/advanced#nextjs
 * _document is only rendered on the server side and not on the client side.
 * Event handlers like onClick can't be added to this file.
 */
class HTMLDocument extends Document {
  render() {
    const links = [
      { rel: "canonical", href: process.env.CANONICAL_URL },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Lato:400,700%7CPoppins:700&display=swap" },

      ...favicons
    ];
    const meta = [
      // Use minimum-scale=1 to enable GPU rasterization
      {
        name: "viewport",
        content: "user-scalable=0, initial-scale=1 minimum-scale=1, width=device-width, height=device-height"
      }
      // PWA primary color
      // {
      //   name: "theme-color",
      //   content: theme.palette.primary.main
      // }
    ];

    // Analytics & Stripe Elements scripts
    const scripts = [
      ...analyticsProviders.map((provider) => ({
        type: "text/javascript",
        innerHTML: provider.renderScript()
      }))
    ];

    return (
      <Html lang="en">
        <Head>
          {meta.map((tag, index) => <meta key={index} {...tag} />)}
          {links.map((link, index) => <link key={index} {...link} />)}
        </Head>
        <body style={{overflowX: "hidden"}}>
          <Main />
          <NextScript />
          {scripts.map((script, index) => (script.innerHTML ? /* eslint-disable-next-line */
            <script async key={index} type={script.type} dangerouslySetInnerHTML={{ __html: script.innerHTML }} /> : <script async key={index} {...script} />))}
        </body>
      </Html>
    );
  }
}

HTMLDocument.getInitialProps = async (ctx) => {
  const styledComponentSheet = new StyledComponentSheets();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => (
        styledComponentSheet.collectStyles(<App {...props} />)
      )
    });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styledComponentSheet.getStyleElement()}
        </>
      )
    };
  } finally {
    styledComponentSheet.seal();
  }
};

export default HTMLDocument;
