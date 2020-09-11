import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "../fe-prod/src/reaction/hocs/inject";
import Helmet from "react-helmet";
import withCatalogItems from "../fe-prod/src/reaction/containers/catalog/withCatalogItems";
import ProductGrid from "../fe-prod/src/reaction/components/ProductGrid";
import Layout from "../fe-prod/src/reaction/components/Layout";
import { inPageSizes } from "../fe-prod/src/reaction/lib/utils/pageSizes";
import { withApollo } from "../fe-prod/src/reaction/lib/apollo/withApollo";

import { locales } from "../fe-prod/src/reaction/translations/config";
import fetchPrimaryShop from "../fe-prod/src/reaction/staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "../fe-prod/src/reaction/staticUtils/translations/fetchTranslations";

class ProductGridPage extends Component {
  static propTypes = {
    catalogItems: PropTypes.array,
    catalogItemsPageInfo: PropTypes.object,
    isLoadingCatalogItems: PropTypes.bool,
    routingStore: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    }),
    tag: PropTypes.object,
    uiStore: PropTypes.shape({
      pageSize: PropTypes.number.isRequired,
      setPageSize: PropTypes.func.isRequired,
      setSortBy: PropTypes.func.isRequired,
      sortBy: PropTypes.string.isRequired
    })
  };

  componentDidMount() {
    const { routingStore } = this.props;
    routingStore.setTagId(null);
  }

  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch({ limit: pageSize });
    this.props.uiStore.setPageSize(pageSize);
  };

  setSortBy = (sortBy) => {
    this.props.routingStore.setSearch({ sortby: sortBy });
    this.props.uiStore.setSortBy(sortBy);
  };

  render() {
    const {
      catalogItems,
      catalogItemsPageInfo,
      isLoadingCatalogItems,
      routingStore: { query },
      shop,
      uiStore
    } = this.props;
    const pageSize = query && inPageSizes(query.limit) ? parseInt(query.limit, 10) : uiStore.pageSize;
    const sortBy = query && query.sortby ? query.sortby : uiStore.sortBy;

    let pageTitle;
    if (shop) {
      pageTitle = shop.name;
      if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;
    } else {
      pageTitle = "Storefront";
    }

    return (
      <Layout shop={shop}>
        <Helmet
          title={pageTitle}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <ProductGrid
          catalogItems={catalogItems}
          currencyCode={(shop && shop.currency && shop.currency.code) || "USD"}
          isLoadingCatalogItems={isLoadingCatalogItems}
          pageInfo={catalogItemsPageInfo}
          pageSize={pageSize}
          setPageSize={this.setPageSize}
          setSortBy={this.setSortBy}
          sortBy={sortBy}
        />
      </Layout>
    );
  }
}

/**
 *  Static props for the main layout
 *
 * @param {String} lang - the shop's language
 * @returns {Object} the props
 */
export async function getStaticProps({ params: { lang } }) {
  const primaryShop = await fetchPrimaryShop(lang);
  const translations = await fetchTranslations(lang, ["common"]);

  if (!primaryShop) {
    return {
      props: {
        shop: null,
        ...translations
      },
      // eslint-disable-next-line camelcase
      unstable_revalidate: 1 // Revalidate immediately
    };
  }

  return {
    props: {
      ...primaryShop,
      ...translations
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120 // Revalidate each two minutes
  };
}

/**
 *  Static paths for the main layout
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false
  };
}

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")(ProductGridPage)));
