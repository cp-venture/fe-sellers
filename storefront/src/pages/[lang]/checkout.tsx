import React from 'react';
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

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType, ...rest }) => {
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

export default withApollo()(withAddressBook(withOrder(CheckoutPage)));
