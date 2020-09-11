import React from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
import Checkout from 'features/checkouts/checkout-two/checkout-two';
import { GET_LOGGED_IN_CUSTOMER } from 'graphql/query/customer.query';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import ErrorMessage from 'components/error-message/error-message';
import { useApolloClient } from "@apollo/client";
import { withApollo } from "lib/apollo/withApollo";
//import CheckoutActions from "components/CheckoutActions";
import useCart from "hooks/cart/useCart";
import useCartStore from "hooks/globalStores/useCartStore";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

const CheckoutPage: NextPage = ({ deviceType, ...rest }) => {

  const token = 'true';
  const apolloClient = useApolloClient();
  const {
    cart,
    isLoadingCart,
    checkoutMutations,
    clearAuthenticatedUsersCart,
    hasMoreCartItems,
    loadMoreCartItems,
    onRemoveCartItems,
    onChangeCartItemsQuantity
  } = useCart("cmVhY3Rpb24vc2hvcDpvRXNybmM5bXFCRHZ0NTJUVw==");
  const cartStore = useCartStore();
  const cartCopy = cart
  const orderEmailAddress = (cart && cart.account && Array.isArray(cart.account.emailRecords) &&
    cart.account.emailRecords[0].address) || (cart ? cart.email : null);

  // console.log(rest, cart, cartStore, orderEmailAddress)
  const paymentMethods = [
    {
      displayName: "Credit Card",
      InputComponent: <>{"Credit Card"}</>,
      name: "stripe_card",
      shouldCollectBillingAddress: true
    },
    {
      displayName: "IOU",
      InputComponent: <>{"IOU"}</>,
      name: "iou_example",
      shouldCollectBillingAddress: true
    }
  ];
  return (
    <>
      <SEO
        title="Checkout Your Purchase - Craflo"
        description="Checkout Details"
      />
      <ProfileProvider initData={{}}>
        <Modal>
          {/*{console.log(cart)}*/}
          <Checkout token={token} deviceType={deviceType}
                    apolloClient={apolloClient}
                    cart={cartCopy}
                    cartStore={cartStore}
                    checkoutMutations={checkoutMutations}
                    clearAuthenticatedUsersCart={clearAuthenticatedUsersCart}
                    orderEmailAddress={orderEmailAddress}
                    paymentMethods={paymentMethods}
          />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      ...await fetchPrimaryShop('in')
    }
  };
}

export default withApollo()(CheckoutPage);
