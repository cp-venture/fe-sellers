import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { SEO } from 'components/seo';
import CartPopUp from 'features/carts/cart-popup';
import { Modal } from '@redq/reuse-modal';

import {
  OfferPageWrapper,
  ProductsRow,
  MainContentArea,
  ProductsCol,
} from 'assets/styles/pages.style';
import GiftCard from 'components/gift-card/gift-card';
import Footer from 'layouts/footer';
import { initializeApollo } from 'utils/apollo';
import dynamic from 'next/dynamic';
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import {locales} from "translations/config";
import {withApollo} from "lib/apollo/withApollo";
import withCart from "containers/cart/withCart";
const ErrorMessage = dynamic(() =>
  import('components/error-message/error-message')
);

const GET_COUPON = gql`
  query {
    coupons {
      id
      code
      image
      discountInPercent
    }
  }
`;
type GiftCardProps = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const GiftCardPage: NextPage<GiftCardProps> = ({ deviceType }) => {
  const { data, error } = useQuery(GET_COUPON);
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <Modal>
      <SEO title="Offer - PickBazar" description="Offer Details" />
      <OfferPageWrapper>
        <MainContentArea>
          <div style={{ width: '100%' }}>
            <ProductsRow>
              {data && data.coupons
                ? data.coupons.map((coupon) => (
                    <ProductsCol key={coupon.id}>
                      <GiftCard image={coupon.image} code={coupon.code} />
                    </ProductsCol>
                  ))
                : null}
            </ProductsRow>
          </div>
        </MainContentArea>

        <Footer />
      </OfferPageWrapper>
      <CartPopUp deviceType={deviceType} />
    </Modal>
  );
};



/**
 *  Static props for the login
 *
 * @returns {Object} the props
 */
export async function getStaticProps({ params: { lang } }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_COUPON,
  });

  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common"]),
      initialApolloState: apolloClient.cache.extract()
    }
  };
}

/**
 *  Static paths for the login
 *
 * @returns {Object} thepaths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false
  };
}

export default withApollo()(withCart(GiftCardPage));
