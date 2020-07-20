import React, { useReducer, useContext, createContext, useState, useEffect } from 'react';
import { reducer, cartItemsTotalPrice } from 'pb-contexts/cart/cart.reducer';
import { useStorage } from 'utils/use-storage';
import useCartHook from "hooks/cart/useCart";

export const CartContext = createContext({} as any);
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const ANONYMOUS_CART_ID_KEY_NAME = "anonymousCartId";
const ANONYMOUS_CART_TOKEN_KEY_NAME = "anonymousCartToken";


const INITIAL_STATE = {
  isOpen: false,
  items: [],
  isRestaurant: false,
  coupon: null,
};


const useCartActions = (initialCart = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialCart);

  const addItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
  };

  const removeItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { ...item, quantity } });
  };

  const clearItemFromCartHandler = (item) => {
    dispatch({ type: 'CLEAR_ITEM_FROM_CART', payload: item });
  };

  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const toggleCartHandler = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  const couponHandler = (coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
  };
  const removeCouponHandler = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };
  const rehydrateLocalState = (payload) => {
    dispatch({ type: 'REHYDRATE', payload });
  };
  const toggleRestaurant = () => {
    dispatch({ type: 'TOGGLE_RESTAURANT' });
  };
  const isInCartHandler = (id) => {
    return state.items?.some((item) => item.id === id);
  };
  const getItemHandler = (id) => {
    return state.items?.find((item) => item.id === id);
  };
  const getCartItemsPrice = () => cartItemsTotalPrice(state.items).toFixed(2);
  const getCartItemsTotalPrice = () =>
    cartItemsTotalPrice(state.items, state.coupon).toFixed(2);

  const getDiscount = () => {
    const total = cartItemsTotalPrice(state.items);
    const discount = state.coupon
      ? (total * Number(state.coupon?.discountInPercent)) / 100
      : 0;
    return discount.toFixed(2);
  };
  const getItemsCount = state.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return {
    state,
    getItemsCount,
    rehydrateLocalState,
    addItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    getCartItemsPrice,
    couponHandler,
    removeCouponHandler,
    getDiscount,
    toggleRestaurant,
  };
};





export const CartProvider = ({ children }) => {

  const [anonymousCartId, setAnonymousCartId] = useState();
  const [anonymousCartToken, setAnonymousCartToken] = useState();
  const [accountCartId, setAccountCartId] = useState();
  const [isReconcilingCarts, setIsReconcilingCarts] = useState(false);
  const [checkoutPayments, setCheckoutPayments] = useState([]);

  const setAnonymousCartCredentials = (newAnonymousCartId, newAnonymousCartToken) => {
    setAnonymousCartId(newAnonymousCartId || null);
    setAnonymousCartToken(newAnonymousCartToken || null);

    if (typeof newAnonymousCartId === "string" && newAnonymousCartId.length) {
      // Save to local storage
      localStorage.setItem(ANONYMOUS_CART_ID_KEY_NAME, newAnonymousCartId);
      localStorage.setItem(ANONYMOUS_CART_TOKEN_KEY_NAME, newAnonymousCartToken);

      // Save cookies
      Cookies.set(ANONYMOUS_CART_ID_KEY_NAME, newAnonymousCartId);
      Cookies.set(ANONYMOUS_CART_TOKEN_KEY_NAME, newAnonymousCartToken);
    } else {
      // Remove from local storage
      localStorage.removeItem(ANONYMOUS_CART_ID_KEY_NAME);
      localStorage.removeItem(ANONYMOUS_CART_TOKEN_KEY_NAME);

      // Remove cookies
      Cookies.remove(ANONYMOUS_CART_ID_KEY_NAME);
      Cookies.remove(ANONYMOUS_CART_TOKEN_KEY_NAME);
    }
  };

  const clearAnonymousCartCredentials = () => {
    setAnonymousCartCredentials(null, null);
  };

  const setAnonymousCartCredentialsFromLocalStorage = () => {
    const anonymousCartId = localStorage.getItem(ANONYMOUS_CART_ID_KEY_NAME); // eslint-disable-line no-shadow
    const anonymousCartToken = localStorage.getItem(ANONYMOUS_CART_TOKEN_KEY_NAME); // eslint-disable-line no-shadow

    setAnonymousCartCredentials(anonymousCartId, anonymousCartToken);
  };

  useEffect(() => {
    setAnonymousCartCredentialsFromLocalStorage();
  }, []);

  const addCheckoutPayment = (value) => {
    setCheckoutPayments([...checkoutPayments, value]);
  };

  const setCheckoutPayment = (value) => {
    setCheckoutPayments([value]);
  };

  const resetCheckoutPayments = () => {
    setCheckoutPayments([]);
  };



  const {
    state,
    rehydrateLocalState,
    getItemsCount,
    addItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    couponHandler,
    removeCouponHandler,
    getCartItemsPrice,
    getDiscount,
    toggleRestaurant,
  } = useCartActions();


  const { rehydrated, error } = useStorage(state, rehydrateLocalState);

  const {
    setEmailOnAnonymousCart,
    clearAuthenticatedUsersCart,
    onChangeCartItemsQuantity,
    loadMoreCartItems,
    onSetShippingAddress,
    addItemsToCart
  } = useCartHook()

  return (
    <CartContext.Provider
      value={{
        anonymousCartId,
        anonymousCartToken,
        accountCartId,
        isReconcilingCarts,
        checkoutPayments,
        setAnonymousCartCredentials,
        clearAnonymousCartCredentials,
        setAnonymousCartCredentialsFromLocalStorage,
        setIsReconcilingCarts,
        hasAnonymousCartCredentials: (anonymousCartId && anonymousCartToken) || false,
        hasAccountCart: typeof accountCartId === "string",
        setAccountCartId,
        addCheckoutPayment,
        setCheckoutPayment,
        resetCheckoutPayments,


        setEmailOnAnonymousCart,
        clearAuthenticatedUsersCart,
        onChangeCartItemsQuantity,
        loadMoreCartItems,
        onSetShippingAddress,
        addItemsToCart,


        isOpen: state.isOpen,
        items: state.items,
        coupon: state.coupon,
        isRestaurant: state.isRestaurant,
        cartItemsCount: state.items?.length,
        itemsCount: getItemsCount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        removeItemFromCart: clearItemFromCartHandler,
        clearCart: clearCartHandler,
        isInCart: isInCartHandler,
        getItem: getItemHandler,
        toggleCart: toggleCartHandler,
        calculatePrice: getCartItemsTotalPrice,
        calculateSubTotalPrice: getCartItemsPrice,
        applyCoupon: couponHandler,
        removeCoupon: removeCouponHandler,
        calculateDiscount: getDiscount,
        toggleRestaurant
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
  children: PropTypes.node
};



export const useCart = () => useContext(CartContext);
