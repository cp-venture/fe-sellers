import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { openModal, closeModal } from '@redq/reuse-modal';
import Cart from './cart';
import CartPopupButton, {
  BoxedCartButton
} from 'components/cart-popup/cart-popup-button';
import { CURRENCY } from 'utils/constant';
import { CartSlidePopup } from './cart.style';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';

const CartPopupStyle = createGlobalStyle`
  .cartPopup{
    top: auto !important;
    left: auto !important;
    bottom: 50px !important;
    right: 50px !important;
    box-shadow: 0 21px 36px rgba(0, 0, 0, 0.16);
    transform-origin: bottom right;

    @media (max-width: 767px) {
      max-width: none!important;
      width: 100% !important;
      bottom: 0 !important;
      left: 0!important;
      background: #fff;
      overflow: initial !important;
      transform-origin: bottom center;
    }
  }
`;

const CartPopUp = ({
  deviceType: { mobile, tablet, desktop },
  cart,
  ...useReactionCart
}) => {
  let { isOpen, cartItemsCount, toggleCart, calculatePrice } = useCart();

  cartItemsCount =  cart?.totalItemQuantity
  calculatePrice = () =>  cart?.checkout ?  cart?.checkout.summary.total.amount : 0
  //--console.log("asdfsdf lakshyy", useReactionCart)


  const handleModal = () => {
    openModal({
      show: true,
      config: {
        className: 'cartPopup',
        width: 'auto',
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        transition: {
          tension: 360,
          friction: 40,
        },
      },
      closeOnClickOutside: true,
      component: Cart,
      closeComponent: () => <div />,
      componentProps: { onCloseBtnClick: closeModal, scrollbarHeight: 330 },
    });
  };

  let cartSliderClass = isOpen === true ? 'cartPopupFixed' : '';

  return (
    <>
      {mobile || tablet ? (
        <>
          <CartPopupStyle />
          <CartPopupButton
            className="product-cart"
            itemCount={cartItemsCount}
            itemPostfix={
              cartItemsCount > 1 ? (
                <FormattedMessage id="cartItems" defaultMessage="items" />
              ) : (
                <FormattedMessage id="cartItem" defaultMessage="item" />
              )
            }
            price={calculatePrice()}
            pricePrefix="$"
            onClick={handleModal}
          />
        </>
      ) : (
        <>
          <CartSlidePopup className={cartSliderClass}>
            {isOpen && (
              <Cart cartContents={cart} useReactionCart = {useReactionCart} onCloseBtnClick={toggleCart} scrollbarHeight="100vh" />
            )}
          </CartSlidePopup>

          <BoxedCartButton
            className="product-cart"
            itemCount={cartItemsCount}
            itemPostfix={
              cartItemsCount > 1 ? (
                <FormattedMessage id="cartItems" defaultMessage="items" />
              ) : (
                <FormattedMessage id="cartItem" defaultMessage="item" />
              )
            }
            price={calculatePrice()}
            pricePrefix={CURRENCY}
            onClick={toggleCart}
          />
        </>
      )}
    </>
  );
};



import PropTypes from "prop-types";
import Helmet from "react-helmet";
import inject from "hocs/inject";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";
import CheckoutButtons from "components/CheckoutButtons";
import Link from "components/Link";
import Layout from "components/Layout";
import Router from "translations/i18nRouter";
import PageLoading from "components/PageLoading";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

// {
//     cart: PropTypes.shape({
//       totalItems: PropTypes.number,
//       items: PropTypes.arrayOf(PropTypes.object),
//       checkout: PropTypes.shape({
//         fulfillmentTotal: PropTypes.shape({
//           displayAmount: PropTypes.string
//         }),
//         itemTotal: PropTypes.shape({
//           displayAmount: PropTypes.string
//         }),
//         taxTotal: PropTypes.shape({
//           displayAmount: PropTypes.string
//         })
//       })
//     }),
//     classes: PropTypes.object,
//     hasMoreCartItems: PropTypes.bool,
//     loadMoreCartItems: PropTypes.func,
//     onChangeCartItemsQuantity: PropTypes.func,
//     onRemoveCartItems: PropTypes.func,
//     shop: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string
//     })
// }

  // handleClick = () => Router.push("/");
  //
  // handleItemQuantityChange = (quantity, cartItemId) => {
  //   const { onChangeCartItemsQuantity } = this.props;
  //
  //   onChangeCartItemsQuantity({ quantity, cartItemId });
  // };
  //
  // handleRemoveItem = async (itemId) => {
  //   const { onRemoveCartItems } = this.props;
  //
  //   await onRemoveCartItems(itemId);
  // };



export default withApollo()(withCart(inject("uiStore")(CartPopUp)));
