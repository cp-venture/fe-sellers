// @ts-nocheck
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import dynamic from 'next/dynamic';
//import {LabeledInput, InputRow} from './demo/LabeledInput';
import createCellPositioner from './Masonry/createCellPositioner';
const GeneralCard = dynamic(
  import('src/components/product-card/product-card-listing/product-card-listing')
);
const Sidebar = dynamic(() => import('src/layouts/sidebar/sidebar'));
import Fade from 'react-reveal/Fade';

import { Link, Element } from 'react-scroll';
import { Button } from 'src/components/button/button';
import {
  ProductDetailsWrapper,
  ProductPreview,
  RestaurantMeta,
  RestaurantNameAddress,
  RestaurantName,
  RestaurantAddress,
  RestaurantOtherInfos,
  InfoBlock,
  Label,
  Infos,
  DeliveryOpt,
  CategoriesWrapper,
  CategoriesInner,
  MainContent,
  MenuContainer,
  ItemCategoryWrapper,
  ItemCategoryName,
  ItemWrapper,
  ItemNameDetails,
  ItemName,
  ItemDetails,
  ItemNamePricing,
  HelpText,
  ItemPrice,
  CartWrapper,
} from 'src/components/product-details/product-details-three/product-details-three.style';
import { CURRENCY } from 'src/utils/constant';
import FixedCart from 'src/features/carts/fixed-cart';
import FixedCartPopup from 'src/features/carts/fixed-cart-popup';
import { FormattedMessage } from 'react-intl';
import Sticky from 'react-stickynode';
import { groupBy } from 'src/utils/groupBy';
import { useCart } from 'src/contexts/cart/use-cart';
import { PlusOutline } from 'src/components/AllSvgIcon';
import { NextPage, GetStaticProps } from 'next';
import StoreNav from "src/components/store-nav/store-nav";
import storeType from "src/constants/storeType";
import {useRefScroll} from "src/utils/use-ref-scroll";
import {Banner} from "src/components/banner/banner";
import {useAppDispatch} from "src/contexts/app/app.provider";
import { useCallback } from 'react';
import {withApollo} from "lib/apollo/withApollo";
import withCatalogItems from "containers/catalog/withCatalogItems";
import inject from "hocs/inject";
import { inPageSizes } from "lib/utils/pageSizes";
import PageLoading from "components/PageLoading/PageLoading";
import ProductGridEmptyMessage from "components/ProductGrid/ProductGridEmptyMessage";
import {Masonry, WindowScroller, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import {SEO} from "src/components/seo";
import {
  ContentSection,
  MainContentArea, MobileCarouselDropdown,
  OfferPageWrapper,
  ProductsCol,
  ProductsRow,
  SidebarSection
} from "src/assets/styles/pages.style";
import GiftCard from "src/components/gift-card/gift-card";
import Footer from "src/layouts/footer";
import CartPopUp from "src/features/carts/cart-popup";
import { Modal } from '@redq/reuse-modal';
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import {useWindowSize} from "../../utils/useWindowSize";
// import PriceSlider from "../../components/price-slider/price-slider";
// import {Box, Flag, MenuItem, SelectedItem} from "../../layouts/header/menu/language-switcher/language-switcher.style";
// import {useLocale} from "../../contexts/language/language.provider";
// import Popover from "../../components/popover/popover";
// import {LangSwitcher} from "../../layouts/header/header.style";


let slug_language;
import { useSize, useScroller } from "mini-virtual-list";
import { usePositioner, useResizeObserver, useMasonry } from "masonic";
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'
import handleViewport from 'react-in-viewport';




const Card = ({ index, width, data}) => {
  // console.log("heyy", {index, width, data})
  // const cardRef = React.useRef()
  // const [inView, setInView]= setState()
  // useEffect(() => {
  //   setView(useOnScreen(cardRef))
  //   // code to run on component mount
  // }, [])

  // console.log(inView, 'index:', index)

  const columnWidth = width
  const p = data;
  // this.props.products[index % this.props.products.length];
  const media = JSON.parse(p.metafields[0].value)
  // let elem = (document.compatMode === "CSS1Compat") ?
  //   document.documentElement :
  //   document.body;
  //
  // let height = elem.clientHeight;
  // let width = elem.clientWidth;
  // let windowSize =
  const imgW = columnWidth
  const imgH = Math.ceil((imgW / media[0].full_width ) * media[0].full_height)
  //Math.ceil(200 + ((1 + (index % 10)) / 10) * 400)
  //--console.log(p.pricing[0].maxPrice, "klkllk")

  return (<div
    style={{
      width: columnWidth,
      // transform: 'translate(0, '+(inViewport? 0:30)+'px)',
      // transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      // transitionDelay: '0.1s',
      // opacity: inViewport? 1:0
    }}
    // ref={forwardedRef}
  >
    <div
      style={{
        backgroundColor: p.color,
        borderRadius: '0.5rem',
        height: (imgH + 130) / 16 + 'rem',
        marginBottom: '0.5rem',
        width: '100%',
        fontSize: 20,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>


      <GeneralCard
        title={p.title}
        description={p.description}
        image={media[0].url_570xN}
        imgH={imgH / 16 + "rem"}
        imgW={imgW / 16 + "rem"}
        currency="USD"
        price={p.pricing[0].maxPrice + ""}
        salePrice={(p.pricing[0].maxPrice) * 0.8 + ""}
        discountInPercent={2}
        product_data={p}
        onClick={() => {
          const as = `../product/${p.slug}`;
          window.open(as, '_blank');
        }
        }
      />
    </div>
  </div>)
}



export const App = ({products, deviceType}) => {
  const containerRef = React.useRef(null);
  const columnGutter = deviceType.mobile? 30: 50
  const columnWidth = deviceType.mobile? ((useWindowSize().width/2)-columnGutter*(5/2)): (useWindowSize().width/5-columnGutter*(5/2))
  // console.log(deviceType, columnWidth, "popouuppu")
  // In this example we are deriving the height and width properties
  // from a hook that measures the offsetWidth and offsetHeight of
  // the scrollable div.
  //
  // The code for this hook can be found here:
  // https://github.com/jaredLunde/mini-virtual-list/blob/5791a19581e25919858c43c37a2ff0eabaf09bfe/src/index.tsx#L376
  const { width, height } = useSize(containerRef);
  // const width=900, height=900;
  // Likewise, we are tracking scroll position and whether or not
  // the element is scrolling using the element, rather than the
  // window.
  //
  // The code for this hook can be found here:
  // https://github.com/jaredLunde/mini-virtual-list/blob/5791a19581e25919858c43c37a2ff0eabaf09bfe/src/index.tsx#L414
  const { scrollTop, isScrolling } = useScroller(containerRef);
  const positioner = usePositioner({
    width,
    columnWidth: columnWidth,
    columnGutter: columnGutter
  });
  const resizeObserver = useResizeObserver(positioner);
  console.log("jjbjbjb", {products, columnWidth, columnGutter})

  return (
    <main >
      <div ref={containerRef}>
        {useMasonry({
          positioner,
          resizeObserver,
          items: products,
          height,
          scrollTop,
          isScrolling,
          overscanBy: 6,
          render: Card
        })}
      </div>
      {/*<Header />*/}
    </main>
  );
};

// const FakeCard = ({ data: { id, name, src } }) => (
//   <div>
//     <img alt="kitty" src={src} />
//     <span children={name} />
//   </div>
// );
//
// const Header = () => {
//   const scrollY = useWindowScroll(5);
//   return (
//     <h1 >
//       <span role="img" aria-label="bricks">
//         🧱
//       </span>{" "}
//       MASONIC
//     </h1>
//   );
// };
//
//
// const randomChoice = items => items[Math.floor(Math.random() * items.length)];
// const getFakeItems = (cur = 0) => {
//   const fakeItems = [];
//   for (let i = 5000 * cur; i < cur * 5000 + 5000; i++)
//     fakeItems.push({ id: i, name: catNames.random(), src: randomChoice(cats) });
//   return fakeItems;
// };
// const items;

// if (typeof window !== 'undefined') {
//   ReactDOM.render(<App />, document.getElementById("XXgscrollXX"));
// }







const LanguageMenu = ({ onClick }) => {
  return (
    <>
      {LANGUAGES.map((item) => (
        <MenuItem onClick={onClick} key={item.id} value={item.id}>
          <span>{item.icon}</span>
          <FormattedMessage
            id={item.intlLangName}
            defaultMessage={item.label}
          />
        </MenuItem>
      ))}
    </>
  );
};



const ProductListingPage: NextPage = ({ deviceType, ...props }) => {
  //--console.log(props, "sdsdd---pulkit")
  slug_language = props.lang

  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });
  const dispatch = useAppDispatch();
  const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
    dispatch,
  ]);
  setSticky()


  const productGroups = [
      "sort",
      "price",
      "color",
      "occasion"
  ]
  props.routingStore.setTagId(null);

  const setPageSize = (pageSize) => {
    props.routingStore.setSearch({ limit: pageSize });
    props.uiStore.setPageSize(pageSize);
  };

  const setSortBy = (sortBy) => {
    props.routingStore.setSearch({ sortby: sortBy });
    props.uiStore.setSortBy(sortBy);
  };

  const headerOffset = deviceType.mobile || deviceType.tablet ? -137 : -177;
  const {
      catalogItems,
      catalogItemsPageInfo,
      isLoadingCatalogItems,
      routingStore: { query },
      shop,
      uiStore
  } = props;
  const pageSize = query && inPageSizes(query.limit) ? parseInt(query.limit, 10) : uiStore.pageSize;
  const sortBy = query && query.sortby ? query.sortby : uiStore.sortBy;

  if (isLoadingCatalogItems) return <PageLoading />;
  let products = (catalogItems || []).map((item) => item.node.product);
  products = new Array(10).fill(products).flat()
  // items = products
  console.log(products)
  if (products.length === 0) return "Sorry, We currently don't have products of choice";


  let pageTitle;
  if (shop) {
      pageTitle = shop.name;
      if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;
  } else {
    pageTitle = "Storefront";
  }

  return (
    <>
    <SEO title="Browse Listings - Craflo" description="find your own craft" />
    <Modal>
      <div style={{margin: "30px" }} />
      {/*<MobileCarouselDropdown>*/}
      {/*  <StoreNav items={storeType} />*/}
      {/*</MobileCarouselDropdown>*/}

            <ProductPreview>
              <img src={"https://media.gettyimages.com/photos/making-paper-flowersart-and-craft-concept-picture-id1149218784"} />
            </ProductPreview>

            <Sticky
              top={deviceType.mobile || deviceType.tablet ? 68 : 78}
              innerZ={0}
            >

              {/*<PriceSlider />*/}
              {/*<LangSwitcher/>*/}
              <CategoriesWrapper>
                <CategoriesInner>
                  {Object.keys(productGroups).map((item, index) => (
                    <Link
                      activeClass="active"
                      className="category"
                      to={Object.keys(productGroups)[index]}
                      offset={headerOffset}
                      spy={true}
                      smooth={true}
                      duration={500}
                      key={index}
                    >
                      {item}
                    </Link>
                  ))}
                </CategoriesInner>
              </CategoriesWrapper>
            </Sticky>
            <div style={{height: "90px"}} />
            <div style={{margin: "0 30px 0 30px" }}>
                <App products={products} deviceType={deviceType}  />
            </div>
        <Footer />
      <CartPopUp deviceType={deviceType}/>
    </Modal>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params: { lang } }) => {
  lang = "en"
  const primaryShop = await fetchPrimaryShop(lang);
  //const translations = await fetchTranslations(lang, ["common"]);

  if (!primaryShop) {
    return {
      props: {
        shop: null,
        //...translations,
        type: 'grocery',
        lang,
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
      initialApolloState: null  //apolloClient.cache.extract(),
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120 // Revalidate each two minutes
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { lang: 'in' } },
      { params: { lang: 'us' } },
      { params: { lang: 'fr' } },
      { params: { lang: 'gb' } },
      { params: { lang: 'ru' } },
      { params: { lang: 'ca' } },
      { params: { lang: 'au' } },
    ],
    fallback: false,
  };
}

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore", "authStore")(ProductListingPage)));


