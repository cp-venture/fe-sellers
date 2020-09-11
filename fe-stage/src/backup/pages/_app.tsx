import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from '../fe-prod/src/theme';
import { AppProvider } from '../fe-prod/src/contexts/app/app.provider';
import { AuthProvider } from '../fe-prod/src/contexts/auth/auth.provider';
import { LanguageProvider } from '../fe-prod/src/contexts/language/language.provider';
import { CartProvider } from '../fe-prod/src/contexts/cart/use-cart';
import { useApollo } from '../fe-prod/src/utils/apollo';
import { useMedia } from '../fe-prod/src/utils/use-media';
import AppLayout from '../fe-prod/src/layouts/app-layout';
// Language translation files
import localEn from '../fe-prod/src/data/translation/en.json';
import localAr from '../fe-prod/src/data/translation/ar.json';
import localEs from '../fe-prod/src/data/translation/es.json';
import localDe from '../fe-prod/src/data/translation/de.json';
import localCn from '../fe-prod/src/data/translation/zh.json';
import localIl from '../fe-prod/src/data/translation/he.json';

// External CSS import here
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import '../fe-prod/src/components/multi-carousel/multi-carousel.style.css';
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
export default function ExtendedApp({ Component, pageProps }) {
  const mobile = useMedia('(max-width: 580px)');
  const tablet = useMedia('(max-width: 991px)');
  const desktop = useMedia('(min-width: 992px)');
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <LanguageProvider messages={messages}>
          <CartProvider>
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
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
