import React, { useEffect, useState } from "react";
import { NextPage, GetStaticProps } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'src/components/seo';
import Checkout from 'src/features/checkouts/checkout-two/checkout-two';
import { GET_LOGGED_IN_CUSTOMER } from 'src/graphql/query/customer.query';

import { ProfileProvider } from 'src/contexts/profile/profile.provider';
import { initializeApollo } from 'src/utils/apollo';
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import {locales} from "translations/config";
import {withApollo} from "lib/apollo/withApollo";
import withOrder from "containers/order/withOrder";
import withAddressBook from "containers/address/withAddressBook";
import CheckoutActions from "components/CheckoutActions/CheckoutActions";
import useStores from "hooks/useStores";
import useShop from "hooks/shop/useShop";
import useTranslation from "hooks/useTranslation";
import useCart from "hooks/cart/useCart";
import useAvailablePaymentMethods from "hooks/availablePaymentMethods/useAvailablePaymentMethods";
import Router from "translations/i18nRouter";
import definedPaymentMethods from "custom/paymentMethods";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};


import { useApolloClient } from "@apollo/client";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
// import useAddressValidation from "hooks/address/useAddressValidation";


const CheckoutPage: NextPage<Props> = ({ router, deviceType, ...rest }) => {
  // let { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER);
  // if (loading) {
  //   return <div>loading...</div>;
  // }
  // if (error) return <div>{error.message}</div>;
  const token = 'true';
  console.log(rest)

  const data = {
    "me": {
      "id": 1,
      "name": "Jhon Doe Smith",
      "email": "jhondDoe@demo.com",
      "address": [
        {
          "id": "12312",
          "type": "primary",
          "name": "Home",
          "info": "27 Street, 2569 Heritage Road Visalia, CA 93291",
          "__typename": "Address"
        },
        {
          "id": "23423",
          "type": "secondary",
          "name": "Office",
          "info": "33 Baker Street, Crescent Road, CA 65746",
          "__typename": "Address"
        }
      ],
      "contact": [
        {
          "id": "88234",
          "type": "primary",
          "number": "202-555-0191",
          "__typename": "Contact"
        },
        {
          "id": "23439",
          "type": "secondary",
          "number": "202-555-0701",
          "__typename": "Contact"
        }
      ],
      "card": [
        {
          "id": "179012",
          "type": "primary",
          "cardType": "paypal",
          "name": "Jhon Doe Smith",
          "lastFourDigit": 2349,
          "__typename": "Card"
        },
        {
          "id": "987234",
          "type": "secondary",
          "cardType": "master",
          "name": "Jhon Doe Smith",
          "lastFourDigit": 8724,
          "__typename": "Card"
        },
        {
          "id": "424987",
          "type": "secondary",
          "cardType": "visa",
          "name": "Jhon Doe Smith",
          "lastFourDigit": 4535,
          "__typename": "Card"
        },
        {
          "id": "455599",
          "type": "secondary",
          "cardType": "visa",
          "name": "Jhon Doe Smith",
          "lastFourDigit": 4585,
          "__typename": "Card"
        }
      ],
      "__typename": "User"
    }
  }




  const { cartStore } = useStores();
  const shop = useShop();
  const apolloClient = useApolloClient();
  // TODO: implement address validation
  // const [addressValidation, addressValidationResults] = useAddressValidation();
  const [stripe, setStripe] = useState();

  const {
    cart,
    isLoadingCart,
    checkoutMutations,
    clearAuthenticatedUsersCart,
    hasMoreCartItems,
    loadMoreCartItems,
    onRemoveCartItems,
    onChangeCartItemsQuantity
  } = useCart();


  const [availablePaymentMethods = [], isLoadingAvailablePaymentMethods] = useAvailablePaymentMethods();

  const { asPath } = router;
  const hasIdentity = !!((cart && cart.account !== null) || (cart && cart.email));
  const pageTitle = hasIdentity ? `Checkout | ${shop && shop.name}` : `Login | ${shop && shop.name}`;

  // useEffect(() => {
  //   // Skipping if the `cart` is not available
  //   if (!cart) return;
  //   if (!hasIdentity) {
  //     Router.push("/cart/login");
  //   }
  // }), [cart, hasIdentity, asPath, Router]; // eslint-disable-line no-sequences

  // useEffect(() => {
  //   if (!stripe && process.env.STRIPE_PUBLIC_API_KEY && window && window.Stripe) {
  //     setStripe(window.Stripe(process.env.STRIPE_PUBLIC_API_KEY));
  //   }
  // }), [stripe]; // eslint-disable-line no-sequences

    // sanity check that "tries" to render the correct /cart view if SSR doesn't provide the `cart`

  // if (!cart) {
  //   return (
  //     <>
  //       <CartEmptyMessage onClick={() => Router.push("/")} messageText="Ihr Warenkorb ist leer." buttonText="Weiter einkaufen" />
  //     </>
  //   );
  // }
  //
  // if (cart && Array.isArray(cart.items) && cart.items.length === 0) {
  //   return (
  //     <>
  //       <CartEmptyMessage onClick={() => Router.push("/")} messageText="Ihr Warenkorb ist leer." buttonText="Weiter einkaufen" />
  //     </>
  //   );
  // }

  const orderEmailAddress = (cart && cart.account && Array.isArray(cart.account.emailRecords) &&
    cart.account.emailRecords[0].address) || (cart ? cart.email : null);

  // Filter the hard-coded definedPaymentMethods list from the client to remove any
  // payment methods that were not returned from the API as currently available.
  const paymentMethods = definedPaymentMethods.filter((method) =>
    !!availablePaymentMethods.find((availableMethod) => availableMethod.name === method.name));



  console.log({
    apolloClient: {apolloClient},
    cart: {cart},
    cartStore:{cartStore},
    checkoutMutations:{checkoutMutations},
    clearAuthenticatedUsersCart:{clearAuthenticatedUsersCart},
    orderEmailAddress:{orderEmailAddress},
    paymentMethods:{paymentMethods}
  })
  // <CheckoutActions
  // apolloClient={apolloClient}
  // cart={cart}
  // cartStore={cartStore}
  // checkoutMutations={checkoutMutations}
  // clearAuthenticatedUsersCart={clearAuthenticatedUsersCart}
  // orderEmailAddress={orderEmailAddress}
  // paymentMethods={paymentMethods}
  // />
  return (
    <>
      <SEO title="Checkout - PickBazar" description="Checkout Details" />
      <ProfileProvider initData={data.me}>
        <Modal>
          <Checkout token={token}
                    deviceType={deviceType}
                    apolloClient={apolloClient}
                    cart={cart}
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

export default withApollo()(withAddressBook(withOrder(CheckoutPage)));
