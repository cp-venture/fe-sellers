import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { SEO } from '../fe-prod/src/components/seo';
import CartPopUp from '../fe-prod/src/features/carts/cart-popup';
import { Modal } from '@redq/reuse-modal';

import {
  OfferPageWrapper,
  ProductsRow,
  MainContentArea,
  ProductsCol,
} from '../fe-prod/src/assets/styles/pages.style';
import GiftCard from '../fe-prod/src/components/gift-card/gift-card';
import Footer from '../fe-prod/src/layouts/footer';
import { initializeApollo } from '../fe-prod/src/utils/apollo';
import dynamic from 'next/dynamic';
const ErrorMessage = dynamic(() =>
  import('../fe-prod/src/components/error-message/error-message')
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

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_COUPON,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
export default GiftCardPage;
