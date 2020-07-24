import React from "react";
import PropTypes from "prop-types";
import { RoutingProvider } from "reaction-contexts/RoutingContext";
import { AuthProvider } from "reaction-contexts/AuthContext";
import { CartProvider } from "reaction-contexts/CartContext";
import { ShopProvider } from "reaction-contexts/ShopContext";
import { TagsProvider } from "reaction-contexts/TagsContext";
import { UIProvider } from "reaction-contexts/UIContext";
import { LocaleProvider } from "reaction-contexts/LocaleContext";

export const ContextProviders = ({ children, pageProps }) => {
  const { tags, shop, lang, translations, namespaces } = pageProps;

  return (
    <RoutingProvider>
      <UIProvider>
        <AuthProvider>
          <CartProvider>
            <LocaleProvider
              lang={lang}
              translations={translations}
              namespaces={namespaces}
            >
              <ShopProvider shop={shop}>
                <TagsProvider tags={tags}>
                  {children}
                </TagsProvider>
              </ShopProvider>
            </LocaleProvider>
          </CartProvider>
        </AuthProvider>
      </UIProvider>
    </RoutingProvider>
  );
};

ContextProviders.propTypes = {
  children: PropTypes.node,
  pageProps: PropTypes.object
};
