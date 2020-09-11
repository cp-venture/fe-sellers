import React from 'react';
import { SEO } from '../fe-prod/src/components/seo';
import OrderReceived from '../fe-prod/src/features/order-received/order-received';

const OrderReceivedPage = () => {
  return (
    <>
      <SEO title="Invoice - PickBazar" description="Invoice Details" />
      <OrderReceived />
    </>
  );
};

export default OrderReceivedPage;
