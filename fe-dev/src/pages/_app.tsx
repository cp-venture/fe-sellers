//@ts-nocheck
import NextApp from "next/app";
import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ContextProviders } from "context/ContextProviders";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import muiTheme from "custom/reactionTheme";



import { ApolloProvider } from '@apollo/react-hooks';
import { theme } from 'theme';
import {useMedia} from "src/utils/use-media";
import hoistNonReactStatic from "hoist-non-react-statics";
import {LanguageProvider} from "src/contexts/language/language.provider";
import {CartProvider} from "src/contexts/cart/use-cart";
import {AppProvider} from "src/contexts/app/app.provider";
import {AuthProvider} from "src/contexts/auth/auth.provider";
import AppLayout from "src/layouts/app-layout";
import { ThemeProvider } from 'styled-components';






// External CSS import here
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'components/multi-carousel/multi-carousel.style.css';
import '@redq/reuse-modal/lib/index.css';
import 'react-tagsinput/react-tagsinput.css'
import { GlobalStyle } from 'assets/styles/global.style';
import { Normalize } from 'styled-normalize'


// paper kit react
// import "assets/css/bootstrap.min.css";
// import "assets/scss/paper-kit.scss";
// import "assets/demo/demo.css";



// Language translation files
import localEn from 'data/translation/en.json';
import localAr from 'data/translation/ar.json';
import localEs from 'data/translation/es.json';
import localDe from 'data/translation/de.json';
import localCn from 'data/translation/zh.json';
import localIl from 'data/translation/he.json';
import {useApollo} from "src/utils/apollo";

// Language translation Config
const messages = {
  in: localEn,
  en: localEn,
  ar: localAr,
  es: localEs,
  de: localDe,
  zh: localCn,
  he: localIl,
};







function withDevice(Component) {
  function withDevice(props) { // eslint-disable-line require-jsdoc

    const mobile = useMedia('(max-width: 580px)');
    const tablet = useMedia('(max-width: 991px)');
    const desktop = useMedia('(min-width: 992px)');
    const apolloClient = useApollo({});
    return (
      <Component {...props} apolloClient={apolloClient} deviceType={{ mobile, tablet, desktop }} />
    )
  }
  hoistNonReactStatic(withDevice, Component);
  return withDevice;
}


class App extends NextApp {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { apolloClient, Component, pageProps, ...rest } = this.props;
    //--console.log(this.props)

    return (
      <>
      <Normalize />
      <ContextProviders pageProps={pageProps}>
        <ComponentsProvider value={components}>
          <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
              <LanguageProvider messages={messages}>
                <CartProvider>
                  <AppProvider>
                    <AuthProvider>
                      <AppLayout {...pageProps} {...rest}>
                        <MuiThemeProvider theme={muiTheme}>
                          <Component {...rest} {...pageProps} />
                        </MuiThemeProvider>
                      </AppLayout>
                      <GlobalStyle />
                    </AuthProvider>
                  </AppProvider>
                </CartProvider>
              </LanguageProvider>
            </ThemeProvider>
          </ApolloProvider>
        </ComponentsProvider>
      </ContextProviders>
      </>
    );
  }
}


export default withDevice(App)
