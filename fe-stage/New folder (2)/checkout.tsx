import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { SEO } from '../fe-prod/src/components/seo';
import Checkout from '../fe-prod/src/features/checkouts/checkout-two/checkout-two';
import { GET_LOGGED_IN_CUSTOMER } from '../fe-prod/src/graphql/query/customer.query';

import { ProfileProvider } from '../fe-prod/src/contexts/profile/profile.provider';
import { initializeApollo } from '../fe-prod/src/utils/apollo';

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

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_LOGGED_IN_CUSTOMER,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
export default CheckoutPage;
