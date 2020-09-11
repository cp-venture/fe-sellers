import React from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
import Checkout from 'features/checkouts/checkout-two/checkout-two';
import { GET_LOGGED_IN_CUSTOMER } from 'graphql/query/customer.query';

import { ProfileProvider } from 'contexts/profile/profile.provider';
import ErrorMessage from 'components/error-message/error-message';

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {

  const token = 'true';

  return (
    <>
      <SEO
        title="Checkout Alternative - PickBazar"
        description="Checkout Details"
      />
      <ProfileProvider initData={{}}>
        <Modal>
          <Checkout token={token} deviceType={deviceType} />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default CheckoutPage;
