import React, { useMemo } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { SEO } from 'components/seo';
import { Modal } from '@redq/reuse-modal';
import gql from 'graphql-tag';
import ProductSingleWrapper, {
  ProductSingleContainer,
} from 'assets/styles/product-single.style';
import { GET_PRODUCT_DETAILS } from 'graphql/query/product.query';
import { initializeApollo } from 'lib/apollo/apolloClient';


import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import withCart from "reaction-containers/cart/withCart";
import ProductDetail from "reaction-components/ProductDetail";
import PageLoading from "reaction-components/PageLoading";
import Layout from "reaction-components/Layout";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchCatalogProduct from "staticUtils/catalog/fetchCatalogProduct";
import fetchAllTags from "staticUtils/tags/fetchAllTags";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

let apolloClient;

/**
 *
 * @name buildJSONLd
 * @param {Object} product - The product
 * @param {Object} shop - The shop
 * @summary Builds a JSONLd object from product properties.
 * @return {String} Stringified product jsonld
 */
function buildJSONLd(product, shop) {
  if (!product || !shop) return "";

  //const currencyCode = shop.currency.code || "USD";
  const priceData = product.pricing[0];
  const images = product.media.map((image) => image.URLs.original);

  let productAvailability = "http://schema.org/InStock";
  if (product.isLowQuantity) {
    productAvailability = "http://schema.org/LimitedAvailability";
  }
  if (product.isBackorder && product.isSoldOut) {
    productAvailability = "http://schema.org/PreOrder";
  }
  if (!product.isBackorder && product.isSoldOut) {
    productAvailability = "http://schema.org/SoldOut";
  }

  // Recommended data from https://developers.google.com/search/docs/data-types/product
  const productJSON = {
    "@context": "http://schema.org/",
    "@type": "Product",
    "brand": product.vendor,
    "description": product.description,
    "image": images,
    "name": product.title,
    "sku": product.sku,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": priceData.minPrice,
      "availability": productAvailability,
      "seller": {
        "@type": "Organization",
        "name": shop.name
      }
    }
  };

  return JSON.stringify(productJSON);
}




const ProductDetails = dynamic(() =>
  import('components/product-details/product-details-one/product-details-one')
);
const ProductDetailsBook = dynamic(() =>
  import('components/product-details/product-details-two/product-details-two')
);
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  [key: string]: any;
};

const ProductPage: NextPage<Props> = ({ data, deviceType, isLoadingProduct, shop }) => {
  console.log(data)
  let content = (
    <ProductDetails product={data.product} deviceType={deviceType} />
  );
  if (data.product.type === 'BOOK') {
    content = (
      <ProductDetailsBook product={data.product} deviceType={deviceType} />
    );
  }


  const router = useRouter();
  //const currencyCode = (shop && shop.currency.code) || "USD";
  const JSONLd = useMemo(() => {
    if (data.product && shop) {
      return ""
      //buildJSONLd(data.product, shop);
    }
    return null;
  }, [data.product, shop]);

  if (isLoadingProduct || router.isFallback) return <PageLoading />;
  if (!data.product && !shop) return <Typography>Not Found</Typography>;


  return (
    <>
      <SEO
        title={`${data.product && data.product.title} | ${shop && shop.name}`}
        description={`${data.product && data.product.description}`}
      />
      <Helmet
        script={[{ type: "application/ld+json", innerHTML: JSONLd }]}
      />

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            {content}
            <CartPopUp deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};




export async function getStaticProps({ params: { slug } } ) {
  const productSlug = slug && slug[0];

  apolloClient = initializeApollo();
  console.log(productSlug)
  console.log("bccccc")
  const { data } = await apolloClient.query({
    query: GET_PRODUCT_DETAILS,
    variables: {
      slug: productSlug
    },
  });
  console.log(data)







  /*
    const primaryShop = await fetchPrimaryShop(lang);
    console.log(primaryShop)
    if (!primaryShop) {
      return {
        props: {
          shop: null,
          translations: null,
          products: null,
          tags: null
        },
        // eslint-disable-next-line camelcase
        unstable_revalidate: 1 // Revalidate immediately
      };
    }
    */
  const primaryShop = {
    shop: {
      name: "Craflo",
      currency:{
        code: "INR"
      }
    }
  }


  return {
    props: {
      ...primaryShop.shop,
      //...await fetchTranslations(lang, ["common", "productDetail"]),
      //...await fetchCatalogProduct(productSlug),
      data: data,
      isLoadingProduct: null,  deviceType: {desktop: true}, shop: {}
      //...await fetchAllTags(lang)
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120 // Revalidate each two minutes
  };
}

/**
 *  Static paths for a product
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {

  const GET_SLUGS = gql`query {
    products(limit: 2000) {
      items {
        slug
      }
    }
  }`
  apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_SLUGS
  });

  console.log(data.products.items.map((p) => p.slug))
  return {
    paths: data.products.items.map((p) => ({ params: { slug: [p.slug]}}) ),
    //locales.map((locale) => ({ params: { slug: ["-"] } })),
    fallback: false
  };
}

export default ProductPage;
