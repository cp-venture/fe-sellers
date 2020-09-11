// @ts-nocheck
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { GET_LOGGED_IN_CUSTOMER } from 'src/graphql/query/customer.query';
import { ProfileProvider } from 'src/contexts/profile/profile.provider';
import SettingsContent from 'src/features/user-profile/settings/settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'src/features/user-profile/user-profile.style';
import Sidebar from 'src/features/user-profile/sidebar/sidebar';
import { SEO } from 'src/components/seo';
import Footer from 'src/layouts/footer';
import ErrorMessage from 'src/components/error-message/error-message';
import useViewer from "hooks/viewer/useViewer";
import {withApollo} from "lib/apollo/withApollo";
import withAddressBook from "containers/address/withAddressBook";
import inject from "hocs/inject";
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'

// const DynamicComponentWithNoSSR = dynamic(() => import('../components/List'), {
//   ssr: false
// })
import ProfilePage from './ProfilePage';
import {App} from '../[lang]/explore';


type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
// pages
import Index from "src/paper-kit-react/src/views/Index.js";
import NucleoIcons from "src/paper-kit-react/src/views/NucleoIcons.js";
import PageLoading from "../../reaction/components/PageLoading/PageLoading";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import withCatalogItems from "containers/catalog/withCatalogItems";
import CartPopUp from "../../features/carts/cart-popup";
import fetchMerchantShop from "staticUtils/shop/fetchMerchantShop";
// import LandingPage from "views/examples/LandingPage.js";
// import ProfilePage from "views/examples/ProfilePage.js";
// import RegisterPage from "views/examples/RegisterPage.js";
// others


const Profile: NextPage = ({ deviceType, ...props}) => {
  const [
    account,
    loading,
    refetch
  ] = useViewer();



  const {
    catalogItems,
    catalogItemsPageInfo,
    isLoadingCatalogItems,
    routingStore: { query },
    shop,
    uiStore
  } = props;

  let pageTitle;
  if (shop) {
    pageTitle = shop.name;
    if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;
  } else {
    pageTitle = "Shop";
  }

  // if (isLoadingCatalogItems) return <PageLoading />;
  const products = (catalogItems || []).map((item) => item.node.product);

  // console.log(products)
  //--console.log('pulkittt')

  // if (!account || loading) {
  //   return <div>loading...</div>;
  // }
  // if (!account) return <ErrorMessage message={"User Not logged in"} />;
  return (
    <>
      <Modal>
      <SEO title="Artists Shop - Craflo" description="Profile Details" />
      <ProfilePage />
      {products.length === 0 ? "Shop's catalog is currently offline":
          (<div style={{margin: "2rem" }}>
              <App products={products} deviceType={deviceType} />
          </div>)}
      {/*<ProfileProvider initData={account}>*/}
      {/*  <Modal>*/}
      {/*    <PageWrapper>*/}
      {/*      <SidebarSection>*/}
      {/*        <Sidebar />*/}
      {/*      </SidebarSection>*/}
      {/*      <ContentBox>*/}
      {/*        <SettingsContent deviceType={deviceType} />*/}
      {/*        */}
      {/*      </ContentBox>*/}

      {/*      <Footer />*/}
      {/*    </PageWrapper>*/}
      {/*  </Modal>*/}
      {/*</ProfileProvider>*/}
      <Footer />
      <CartPopUp deviceType={deviceType}/>
      </Modal>
    </>
  );
};



export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  let lang = "en"
  const primaryShop = await fetchPrimaryShop(lang);
  fetchMerchantShop(slug).then((data)=>{
    console.log(data, ":::sdfgsdpjsdfgpjsdfg")
    // alert(data)
  });

  //const translations = await fetchTranslations(lang, ["common"]);

  if (!primaryShop) {
    return {
      props: {
        shop: null,
        //...translations,
        type: 'grocery',
        lang,
        slug,
        initialApolloState: null  //apolloClient.cache.extract(),
      },
      // eslint-disable-next-line camelcase
      unstable_revalidate: 1 // Revalidate immediately
    };
  }
  //--console.log(primaryShop, "pulkit0009")

  return {
    props: {
      ...primaryShop,
      //...translations,
      type: 'grocery',
      lang,
      slug,
      initialApolloState: null  //apolloClient.cache.extract(),
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120 // Revalidate each two minutes
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'jake' } }
    ],
    fallback: true,
  };
}


export default withApollo()(withCatalogItems(inject("routingStore", "uiStore", "authStore")(Profile)));

