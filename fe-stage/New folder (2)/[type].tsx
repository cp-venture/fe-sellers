import React from 'react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
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
import { PAGES_DATA } from '../fe-prod/src/data/pages';
import storeType from '../fe-prod/src/constants/storeType';
import { SEO } from '../fe-prod/src/components/seo';
import { useRefScroll } from '../fe-prod/src/utils/use-ref-scroll';
import fetchPrimaryShop from "../fe-prod/src/reaction/staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "../fe-prod/src/reaction/staticUtils/translations/fetchTranslations";
import { initializeApollo } from '../fe-prod/src/utils/apollo';
import { GET_PRODUCTS } from '../fe-prod/src/graphql/query/products.query';
import { GET_CATEGORIES } from '../fe-prod/src/graphql/query/category.query';

const Sidebar = dynamic(() => import('../fe-prod/src/layouts/sidebar/sidebar'));
const Products = dynamic(() =>
  import('../fe-prod/src/components/product-grid/product-list/product-list')
);
const CartPopUp = dynamic(() => import('../fe-prod/src/features/carts/cart-popup'), {
  ssr: false,
});

const CategoryPage: React.FC<any> = ({ deviceType }) => {
  const { query } = useRouter();
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });
  React.useEffect(() => {
    if (query.text || query.category) {
      scroll();
    }
  }, [query.text, query.category]);
  const PAGE_TYPE: any = query.type;
  const page = PAGES_DATA[PAGE_TYPE];
  return (
    <>
      <SEO title={page?.page_title} description={page?.page_description} />

      <Modal>
        <Banner
          intlTitleId={page?.banner_title_id}
          intlDescriptionId={page?.banner_description_id}
          imageUrl={page?.banner_image_url}
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
                fetchLimit={20}
              />
            </div>
          </ContentSection>
        </MainContentArea>
        <CartPopUp deviceType={deviceType} />
      </Modal>
    </>
  );
};
export const getStaticProps: GetStaticProps = async ({ params: { lang, type } }) => {
  const primaryShop = await fetchPrimaryShop(lang);
  const translations = await fetchTranslations(lang, ["common"]);

  if (!primaryShop) {
    return {
      props: {
        shop: null,
        ...translations,
        type,
        lang,
        initialApolloState: null  //apolloClient.cache.extract(),
      },
      // eslint-disable-next-line camelcase
      unstable_revalidate: 1 // Revalidate immediately
    };
  }
  console.log(primaryShop, "pulkit0009")

  return {
    props: {
      ...primaryShop,
      ...translations,
      type,
      lang,
      initialApolloState: null  //apolloClient.cache.extract(),
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120 // Revalidate each two minutes
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { type: 'grocery' } },
      { params: { type: 'makeup' } },
      { params: { type: 'bags' } },
      { params: { type: 'book' } },
      { params: { type: 'medicine' } },
      { params: { type: 'furniture' } },
      { params: { type: 'clothing' } },
    ],
    fallback: false,
  };
}
export default CategoryPage;
