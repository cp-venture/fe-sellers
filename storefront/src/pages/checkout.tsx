import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
import Checkout from 'features/checkouts/checkout-two/checkout-two';
import { GET_LOGGED_IN_CUSTOMER } from 'graphql/query/customer.query';

import { ProfileProvider } from 'contexts/profile/profile.provider';
import { initializeApollo } from 'utils/apollo';
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import {locales} from "translations/config";
import {withApollo} from "lib/apollo/withApollo";
import withOrder from "containers/order/withOrder";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER);
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) return <div>{error.message}</div>;
  const token = 'true';

  return (
    <>
      <SEO title="Checkout - PickBazar" description="Checkout Details" />
      <ProfileProvider initData={data.me}>
        <Modal>
          <Checkout token={token} deviceType={deviceType} />
        </Modal>
      </ProfileProvider>
    </>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const apolloClient = initializeApollo();
//
//   await apolloClient.query({
//     query: GET_LOGGED_IN_CUSTOMER,
//   });
//
//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// };
// export default CheckoutPage;




/**
 *  Static props for an order
 *
 * @returns {Object} the props
 */
export async function getStaticProps({ params: { lang } }) {
  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common"]),
      initialApolloState: null
    }
  };
}

/**
 *  Static paths for an order
 *
 * @returns {Object} the props
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: true
  };
}

export default withApollo()(withOrder((CheckoutPage));
