// @ts-nocheck
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import dynamic from 'next/dynamic';
//import {LabeledInput, InputRow} from './demo/LabeledInput';
import createCellPositioner from './Masonry/createCellPositioner';
const GeneralCard = dynamic(
  import('components/product-card/product-card-listing/product-card-listing')
);
const Sidebar = dynamic(() => import('src/layouts/sidebar/sidebar'));
import Fade from 'react-reveal/Fade';

import { Link, Element } from 'react-scroll';
import { Button } from 'components/button/button';
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
import { CURRENCY } from 'utils/constant';
import FixedCart from 'features/carts/fixed-cart';
import FixedCartPopup from 'features/carts/fixed-cart-popup';
import { FormattedMessage } from 'react-intl';
import Sticky from 'react-stickynode';
import { groupBy } from 'utils/groupBy';
import { useCart } from 'contexts/cart/use-cart';
import { PlusOutline } from 'components/AllSvgIcon';
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



const ProductsContext = React.createContext({} as any)

class ProductMasonry extends React.PureComponent {
  static contextType = ProductsContext

  constructor(props, context) {
    super(props, context);
    this._columnCount = 0;
    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
      fixedWidth: true
    });

    this.state = {
      columnWidth: 302,
      height: 300,
      gutterSize: 35,
      overscanByPixels: 0,
      windowScrollerEnabled: true
    };

    this._cellRenderer = this._cellRenderer.bind(this);
    this._onResize = this._onResize.bind(this);
    this._renderAutoSizer = this._renderAutoSizer.bind(this);
    this._renderMasonry = this._renderMasonry.bind(this);
    this._setMasonryRef = this._setMasonryRef.bind(this);
  }

  render() {
    const {
      columnWidth,
      height,
      gutterSize,
      overscanByPixels,
      windowScrollerEnabled,
    } = this.state;

    let child;
    if (windowScrollerEnabled) {
      child = (
        <WindowScroller overscanByPixels={overscanByPixels}>
          {this._renderAutoSizer}
        </WindowScroller>
      );
    }
    else {
      child = this._renderAutoSizer({height});
    }

    return (
      <>
        {/*
        <InputRow>
          <LabeledInput
            label="Height"
            name="height"
            onChange={event => {
              this.setState({
                height: parseInt(event.target.value, 10) || 300,
              });
            }}
            value={height}
          />
          <LabeledInput
            label="Column Width"
            name="columnWidth"
            onChange={event => {
              this._cache.clearAll();
              this.setState(
                {
                  columnWidth: parseInt(event.target.value, 10) || 200,
                },
                () => {
                  this._calculateColumnCount();
                  this._resetCellPositioner();
                  this._masonry.clearCellPositions();
                },
              );
            }}
            value={columnWidth}
          />
          <LabeledInput
            label="Gutter Size"
            name="gutterSize"
            onChange={event => {
              this.setState(
                {
                  gutterSize: parseInt(event.target.value, 10) || 10,
                },
                () => {
                  this._calculateColumnCount();
                  this._resetCellPositioner();
                  this._masonry.recomputeCellPositions();
                },
              );
            }}
            value={gutterSize}
          />
          <LabeledInput
            label="Overscan (px)"
            name="overscanByPixels"
            onChange={event => {
              this.setState({
                overscanByPixels: parseInt(event.target.value, 10) || 0,
              });
            }}
            value={overscanByPixels}
          />
        </InputRow>
        */}

        {child}
      </>
    );
  }

  _calculateColumnCount() {
    const {columnWidth, gutterSize} = this.state;
    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  }

  _cellRenderer({index, key, parent, style}) {
    const products = this.context;
    //--console.log(products, "pulkiii")
    const {columnWidth} = this.state;
    const p = products[index % products.length];
    const media = JSON.parse(p.metafields[0].value)
    const imgW = 442
    const imgH = Math.ceil((imgW / media[0].full_width ) * media[0].full_height)
    //Math.ceil(200 + ((1 + (index % 10)) / 10) * 400)
    //--console.log(p.pricing[0].maxPrice, "klkllk")
    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <div
          style={{
            ...style,
            width: columnWidth,
          }}>
          <div
            style={{
              backgroundColor: p.color,
              borderRadius: '0.5rem',
              height: (imgH + 130)/16 + 'rem',
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
              imgH={imgH/16 + "rem"}
              imgW={imgW/16 + "rem"}
              currency="USD"
              price={p.pricing[0].maxPrice + ""}
              salePrice={(p.pricing[0].maxPrice)*0.8 + ""}
              discountInPercent={2}
              product_data = {p}
            />
          </div>
        </div>
      </CellMeasurer>
    );
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === 'undefined') {
      const {columnWidth, gutterSize} = this.state;
      this._cellPositioner = createCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize,
      });
    }
  }

  _onResize({width}) {
    this._width = width;
    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  }

  _renderAutoSizer({height, scrollTop}) {
    this._height = height;
    this._scrollTop = scrollTop;
    const {overscanByPixels} = this.state;
    return (
      <AutoSizer
        disableHeight
        height={height}
        onResize={this._onResize}
        overscanByPixels={overscanByPixels}
        scrollTop={this._scrollTop}>
        {this._renderMasonry}
      </AutoSizer>
    );
  }

  _renderMasonry({width}) {
    this._width = width;
    this._calculateColumnCount();
    this._initCellPositioner();

    const {height, overscanByPixels, windowScrollerEnabled} = this.state;

    return (
      <Masonry
        autoHeight={windowScrollerEnabled}
        cellCount={1000}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellPositioner={this._cellPositioner}
        cellRenderer={this._cellRenderer}
        height={windowScrollerEnabled ? this._height : height}
        overscanByPixels={overscanByPixels}
        ref={this._setMasonryRef}
        scrollTop={this._scrollTop}
        width={width}
      />
    );
  }

  // This is a bit of a hack to simulate newly loaded cells
  _resetList = () => {
    const ROW_HEIGHTS = [25, 50, 75, 100];

    const {list} = this.context;
    list.forEach(datum => {
      datum.size = ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)];
    });

    this._cache.clearAll();
    this._resetCellPositioner();
    this._masonry.clearCellPositions();
  };

  _resetCellPositioner() {
    const {columnWidth, gutterSize} = this.state;

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize,
    });
  }

  _setMasonryRef(ref) {
    this._masonry = ref;
  }
}



const ProductListingPage: NextPage = ({ deviceType, ...props }) => {
  //--console.log(props, "sdsdd---pulkit")

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


  let pageTitle;
  if (shop) {
      pageTitle = shop.name;
      if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;
  } else {
    pageTitle = "Storefront";
  }

  if (isLoadingCatalogItems) return <PageLoading />;
  const products = (catalogItems || []).map((item) => item.node.product);
  if (products.length === 0) return "Sorry, We currently don't have products of choice";

  return (
    <>
    <SEO title="Browse Listings - Craflo" description="find your own craft" />
    <Modal>
      <div style={{margin: "2rem" }} />
      <MobileCarouselDropdown>
        <StoreNav items={storeType} />
        <Sidebar type={"Grocery"} deviceType={deviceType} />
      </MobileCarouselDropdown>

            <ProductPreview>
              <img src={"https://media.gettyimages.com/photos/making-paper-flowersart-and-craft-concept-picture-id1149218784"} />
            </ProductPreview>

            <Sticky
              top={deviceType.mobile || deviceType.tablet ? 68 : 78}
              innerZ={999}
            >
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
            <div style={{margin: "2rem" }}>
              <ProductsContext.Provider value={products} >
                <ProductMasonry />
              </ProductsContext.Provider>
            </div>
        <Footer />
      <CartPopUp deviceType={deviceType}/>
    </Modal>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params: { lang, type } }) => {
  const primaryShop = await fetchPrimaryShop(lang);
  //const translations = await fetchTranslations(lang, ["common"]);

  if (!primaryShop) {
    return {
      props: {
        shop: null,
        //...translations,
        type,
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
      { params: { lang: 'in', type: 'grocery' } },
      { params: { lang: 'us', type: 'makeup' } },
      { params: { lang: 'fr', type: 'bags' } },
      { params: { lang: 'gb', type: 'book' } },
      { params: { lang: 'ru', type: 'medicine' } },
      { params: { lang: 'ca', type: 'furniture' } },
      { params: { lang: 'au', type: 'clothing' } },
    ],
    fallback: false,
  };
}

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore", "authStore")(ProductListingPage)));


