import React from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { SEO } from '../fe-prod/src/components/seo';
import RequestMedicine from '../fe-prod/src/features/request-product/request-product';
import { GET_LOGGED_IN_CUSTOMER } from '../fe-prod/src/graphql/query/customer.query';

import { ProfileProvider } from '../fe-prod/src/contexts/profile/profile.provider';
import ErrorMessage from '../fe-prod/src/components/error-message/error-message';

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const RequestMedicinePage: NextPage<Props> = ({ deviceType }) => {
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER);
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) return <ErrorMessage message={error.message} />;
  const token = true;

  return (
    <>
      <SEO
        title="Request Medicine - PickBazar"
        description="Request Medicine Details"
      />
      <ProfileProvider initData={data.me}>
        <Modal>
          <RequestMedicine token={token} deviceType={deviceType} />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default RequestMedicinePage;
