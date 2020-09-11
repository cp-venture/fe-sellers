import React from 'react';
import { NextPage } from 'next';
import { SEO } from '../fe-prod/src/components/seo';
import Order from '../fe-prod/src/features/user-profile/order/order';
import {
  PageWrapper,
  SidebarSection,
} from '../fe-prod/src/features/user-profile/user-profile.style';
import Sidebar from '../fe-prod/src/features/user-profile/sidebar/sidebar';
import { Modal } from '@redq/reuse-modal';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const OrderPage: NextPage<Props> = ({ deviceType }) => {
  return (
    <>
      <SEO title="Order - PickBazar" description="Order Details" />
      <Modal>
        <PageWrapper>
          {deviceType.desktop && (
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
          )}

          <Order deviceType={deviceType} />
        </PageWrapper>
      </Modal>
    </>
  );
};

export default OrderPage;
