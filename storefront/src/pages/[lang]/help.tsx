import React from 'react';
import styled from 'styled-components';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
import Footer from 'layouts/footer';
import Accordion from 'components/accordion/accordion';
import {initializeApollo} from "src/utils/apollo";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import {locales} from "translations/config";
import {withApollo} from "lib/apollo/withApollo";
import withCart from "containers/cart/withCart";

const accordionData = [
  {
    id: 1,
    intlTitleId: 'faqNo1Title',
    intlDetailsId: 'faqNo1Desc',
    values: { number1: 7, number2: 2 },
  },
  {
    id: 2,
    intlTitleId: 'faqNo2Title',
    intlDetailsId: 'faqNo2Desc',
  },
  {
    id: 3,
    intlTitleId: 'faqNo3Title',
    intlDetailsId: 'faqNo3Desc',
  },
  {
    id: 4,
    intlTitleId: 'faqNo4Title',
    intlDetailsId: 'faqNo4Desc',
  },
];

const Heading = styled.h3`
  font-size: 21px;
  font-weight: 700;
  color: #0d1136;
  line-height: 1.2;
  margin-bottom: 25px;
  width: 100%;
  text-align: center;
`;

const HelpPageWrapper = styled.div`
  background-color: #f7f7f7;
  position: relative;
  padding: 130px 0 60px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 989px) {
    padding-top: 70px;
  }
`;

export const HelpPageContainer = styled.div`
  background-color: transparent;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  @media (min-width: 990px) {
    width: 870px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 989px) {
    padding: 30px;
  }
`;

function HelpPage() {
  return (
    <Modal>
      <SEO title="F.A.Q - PickBazar" description="F.A.Q Details" />
      <HelpPageWrapper>
        <HelpPageContainer>
          <Heading>F.A.Q</Heading>
          <Accordion items={accordionData} />
        </HelpPageContainer>

        <Footer />
      </HelpPageWrapper>
    </Modal>
  );
}





/**
 *  Static props for the login
 *
 * @returns {Object} the props
 */
export async function getStaticProps({ params: { lang } }) {
  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common"])
    }
  };
}

/**
 *  Static paths for the login
 *
 * @returns {Object} thepaths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false
  };
}

export default withApollo()(withCart(HelpPage));



