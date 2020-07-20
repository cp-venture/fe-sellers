import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme';
import { ContextProviders } from "reaction-contexts/ContextProviders";

import { AppProvider } from 'pb-contexts/app/app.provider';
import { AuthProvider } from 'reaction-contexts/AuthContext';
import { LanguageProvider } from 'pb-contexts/language/language.provider';
import { useApollo } from 'lib/apollo/apolloClient';
import { useMedia } from 'utils/use-media';
import AppLayout from 'layouts/app-layout';
// Language translation files
import localEn from 'data/translation/en.json';
import localAr from 'data/translation/ar.json';
import localEs from 'data/translation/es.json';
import localDe from 'data/translation/de.json';
import localCn from 'data/translation/zh.json';
import localIl from 'data/translation/he.json';

// External CSS import here
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'components/multi-carousel/multi-carousel.style.css';
import '@redq/reuse-modal/lib/index.css';
import { GlobalStyle } from 'assets/styles/global.style';

// Language translation Config
const messages = {
  en: localEn,
  ar: localAr,
  es: localEs,
  de: localDe,
  zh: localCn,
  he: localIl,
};
// need to provide types


@withApolloClient
@withMobX
@withShop
@withViewer
export default function ExtendedApp({ Component, pageProps }) {
  const mobile = useMedia('(max-width: 580px)');
  const tablet = useMedia('(max-width: 991px)');
  const desktop = useMedia('(min-width: 992px)');
  const apolloClient = useApollo(pageProps.initialApolloState);
  console.log(apolloClient)

  return (
      <ContextProviders pageProps={pageProps}>
        <ThemeProvider theme={theme}>
          <LanguageProvider messages={messages}>
              <AppProvider>
                <AuthProvider>
                  <AppLayout>

                      <Component
                        {...pageProps}
                        deviceType={{ mobile, tablet, desktop }}
                      />

                  </AppLayout>
                  <GlobalStyle />
                </AuthProvider>
              </AppProvider>
          </LanguageProvider>
        </ThemeProvider>
      </ContextProviders>
  );
}
