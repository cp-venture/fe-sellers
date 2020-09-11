import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Modal } from '@redq/reuse-modal';
import StoreNav from '../fe-prod/src/components/store-nav/store-nav';
import Carousel from '../fe-prod/src/components/carousel/carousel';
import { Banner } from '../fe-prod/src/components/banner/banner';

import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  OfferSection,
  MobileCarouselDropdown,
} from '../fe-prod/src/assets/styles/pages.style';
// Static Data Import Here
import OFFERS from '../fe-prod/src/data/offers';
import BannerImg from '../fe-prod/src/assets/images/banner/restaurant.png';
import storeType from '../fe-prod/src/constants/storeType';
import { SEO } from '../fe-prod/src/components/seo';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../fe-prod/src/utils/apollo';
import { GET_PRODUCTS } from '../fe-prod/src/graphql/query/products.query';
import { GET_CATEGORIES } from '../fe-prod/src/graphql/query/category.query';

const Sidebar = dynamic(() => import('../fe-prod/src/layouts/sidebar/sidebar'));
const Products = dynamic(() =>
  import('../fe-prod/src/components/product-grid/product-list-two/product-list-two')
);
const PAGE_TYPE = 'restaurant';

function RestaurantPage({ deviceType }) {
  const { query } = useRouter();
  const targetRef = React.useRef(null);
  React.useEffect(() => {
    if ((query.text || query.category) && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 110,
        behavior: 'smooth',
      });
    }
  }, [query]);

  return (
    <>
      <SEO title="Restaurant - PickBazar" description="Restaurant Details" />
      <Modal>
        <Banner
          intlTitleId="foodsTitle"
          intlDescriptionId="foodsSubTitle"
          imageUrl={BannerImg}
        />
        <MobileCarouselDropdown>
          <StoreNav items={storeType} />
          <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
        </MobileCarouselDropdown>
        <OfferSection>
          <div style={{ margin: '0 -10px' }}>
            <Carousel deviceType={deviceType} data={OFFERS} />
          </div>
        </OfferSection>
        <MainContentArea>
          <SidebarSection>
            <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
          </SidebarSection>
          <ContentSection>
            <div ref={targetRef}>
              <Products
                type={PAGE_TYPE}
                deviceType={deviceType}
                fetchLimit={16}
              />
            </div>
          </ContentSection>
        </MainContentArea>
      </Modal>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_PRODUCTS,
    variables: {
      type: PAGE_TYPE,
      offset: 0,
      limit: 20,
    },
  });
  await apolloClient.query({
    query: GET_CATEGORIES,
    variables: {
      type: PAGE_TYPE,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
};

export default RestaurantPage;
