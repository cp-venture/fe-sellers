import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Button } from 'components/button/button';
import RadioCard from 'components/radio-card/radio-card';
import RadioGroup from 'components/radio-group/radio-group';
import PaymentGroup from 'components/payment-group/payment-group';
import UpdateAddress from 'components/address-card/address-card';
import UpdateContact from 'components/contact-card/contact-card';
import StripePaymentForm from 'features/payment/stripe-form';
import { DELETE_ADDRESS } from 'graphql/mutation/address';
import { DELETE_CARD } from 'graphql/mutation/card';
import { DELETE_CONTACT } from 'graphql/mutation/contact';
import { CURRENCY } from 'utils/constant';
import { openModal } from '@redq/reuse-modal';
import { useMutation } from '@apollo/react-hooks';
import { Scrollbars } from 'react-custom-scrollbars';
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  Heading,
  ButtonGroup,
  CheckoutSubmit,
  HaveCoupon,
  CouponBoxWrapper,
  CouponInputBox,
  Input,
  CouponCode,
  RemoveCoupon,
  ErrorMsg,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text,
  Bold,
  Small,
  NoProductMsg,
  IconWrapper, SubHeadings,
} from './checkout-two.style';

import { Plus } from 'assets/icons/PlusMinus';

import Sticky from 'react-stickynode';
// import { HeaderContext } from 'contexts/header/header.context';

import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import { APPLY_COUPON } from 'graphql/mutation/coupon';
import { useLocale } from 'contexts/language/language.provider';
import { useWindowSize } from 'utils/useWindowSize';
import {Header, SavedCard} from "src/components/payment-group/payment-group.style";
import {placeOrderMutation} from "hooks/orders/placeOrder.gql";
import PageLoading from "components/PageLoading/PageLoading";
import calculateRemainderDue from "lib/utils/calculateRemainderDue";


///reaction imports
import { isEqual } from "lodash";
import Actions from "@reactioncommerce/components/CheckoutActions/v1";
import ShippingAddressCheckoutAction from "@reactioncommerce/components/ShippingAddressCheckoutAction/v1";
import FulfillmentOptionsCheckoutAction from "@reactioncommerce/components/FulfillmentOptionsCheckoutAction/v1";
import PaymentsCheckoutAction from "@reactioncommerce/components/PaymentsCheckoutAction/v1";
import FinalReviewCheckoutAction from "@reactioncommerce/components/FinalReviewCheckoutAction/v1";
import { addTypographyStyles } from "@reactioncommerce/components/utils";
import withAddressValidation from "containers/address/withAddressValidation";
import Dialog from "@material-ui/core/Dialog";

import styled from "styled-components";
const MessageDiv = styled.div`
  ${addTypographyStyles("NoPaymentMethodsMessage", "bodyText")}
`;

const NoPaymentMethodsMessage = () => <MessageDiv>No payment methods available</MessageDiv>;

NoPaymentMethodsMessage.renderComplete = () => "";

///reaction imports

// The type of props Checkout Form receives
// interface MyFormProps {
//   token: string;
//   deviceType: any;
// }

type CartItemProps = {
  product: any;
};

const OrderItem: React.FC<CartItemProps> = ({ product }) => {
  const {price} = product
  const displayPrice = price.displayAmount ? price.displayAmount : price.amount;
  return (
    <Items key={product._id}>
      <Quantity>{product.quantity}</Quantity>
      <Multiplier>x</Multiplier>
      <ItemInfo>
        {name ? name : product.title} {product.optionTitle ? `| ${product.optionTitle}` : ''}
      </ItemInfo>
      <Price>
        {CURRENCY}
        {(price.amount * product.quantity).toFixed(2)}
      </Price>
    </Items>
  );
};

const CheckoutWithSidebar: React.FC = ({ token, deviceType, ...props }) => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setError] = useState('');
  const { state, dispatch } = useContext(ProfileContext);
  const { isRtl } = useLocale();
  const {
    removeCoupon,
    coupon,
    applyCoupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
    isRestaurant,
    toggleRestaurant,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { address, contact, card, schedules } = state;

  const [deleteContactMutation] = useMutation(DELETE_CONTACT);
  const [deleteAddressMutation] = useMutation(DELETE_ADDRESS);
  const [deletePaymentCardMutation] = useMutation(DELETE_CARD);
  const [appliedCoupon] = useMutation(APPLY_COUPON);
  const size = useWindowSize();
  console.log(props)
  // return (<></>)

  const handleSubmit = async () => {
    setLoading(true);
    if (isValid) {
      clearCart();
      Router.push('/order-received');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      calculatePrice() > 0 &&
      cartItemsCount > 0 &&
      address.length &&
      contact.length &&
      card.length &&
      schedules.length
    ) {
      setIsValid(true);
    }
  }, [state]);
  useEffect(() => {
    return () => {
      if (isRestaurant) {
        toggleRestaurant();
        clearCart();
      }
    };
  }, []);
  // Add or edit modal
  const handleModal = (
    modalComponent: any,
    modalProps = {},
    className: string = 'add-address-modal'
  ) => {
    openModal({
      show: true,
      config: {
        width: 360,
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        className: className,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: { item: modalProps },
    });
  };

  const handleEditDelete = async (item: any, type: string, name: string) => {
    if (type === 'edit') {
      const modalComponent = name === 'address' ? UpdateAddress : UpdateContact;
      handleModal(modalComponent, item);
    } else {
      switch (name) {
        case 'payment':
          dispatch({ type: 'DELETE_CARD', payload: item.id });

          return await deletePaymentCardMutation({
            variables: { cardId: JSON.stringify(item.id) },
          });
        case 'contact':
          dispatch({ type: 'DELETE_CONTACT', payload: item.id });

          return await deleteContactMutation({
            variables: { contactId: JSON.stringify(item.id) },
          });
        case 'address':
          dispatch({ type: 'DELETE_ADDRESS', payload: item.id });

          return await deleteAddressMutation({
            variables: { addressId: JSON.stringify(item.id) },
          });
        default:
          return false;
      }
    }
  };

  const handleApplyCoupon = async () => {
    const { data }: any = await appliedCoupon({
      variables: { code: couponCode },
    });
    if (data.applyCoupon && data.applyCoupon.discountInPercent) {
      applyCoupon(data.applyCoupon);
      setCouponCode('');
    } else {
      setError('Invalid Coupon');
    }
  };
  const handleOnUpdate = (code: any) => {
    setCouponCode(code);
  };

/// rection checkout start here: cart/checkout.tsx
//
//   let _isMounted = false;
//
//   const {RState, setRState} = useState({
//     actionAlerts: {
//       1: null,
//       2: null,
//       3: null,
//       4: null
//     },
//     hasPaymentError: false,
//     isPlacingOrder: false
//   });
//
//   useEffect(({ addressValidationResults: prevAddressValidationResults }) => {
//     const { addressValidationResults } = props;
//     if (
//       addressValidationResults &&
//       prevAddressValidationResults &&
//       !isEqual(addressValidationResults, prevAddressValidationResults)
//     ) {
//       this.handleValidationErrors();
//     }
//     _isMounted = true;
//   });
//
//
//   useEffect(() => {
//     return () => {
//       _isMounted = false;
//     }
//   });
//
//   const buildData = ({ step, action }) => ({
//     action,
//     payment_method: this.paymentMethod, // eslint-disable-line camelcase
//     shipping_method: this.shippingMethod, // eslint-disable-line camelcase
//     step
//   });
//
//   // get shippingMethod() {
//   //   const { checkout: { fulfillmentGroups } } = props.cart;
//   //   const { selectedFulfillmentOption } = fulfillmentGroups[0];
//   //   return selectedFulfillmentOption ? selectedFulfillmentOption.fulfillmentMethod.displayName : null;
//   // }
//   //
//   // get paymentMethod() {
//   //   const [firstPayment] = props.cartStore.checkoutPayments;
//   //   return firstPayment ? firstPayment.payment.method : null;
//   // }
//
//   const setShippingAddress = async (address) => {
//     const { checkoutMutations: { onSetShippingAddress } } = props;
//     delete address.isValid;
//     const { data, error } = await onSetShippingAddress(address);
//
//     if (data && !error && _isMounted) {
//       setRState({
//         actionAlerts: {
//           1: {}
//         }
//       });
//     }
//   };
//
//   const handleValidationErrors = ()=>{
//     const { addressValidationResults } = props;
//     const { validationErrors } = addressValidationResults || [];
//     const shippingAlert =
//       validationErrors && validationErrors.length ? {
//         alertType: validationErrors[0].type,
//         title: validationErrors[0].summary,
//         message: validationErrors[0].details
//       } : null;
//     setRState({ actionAlerts: { 1: shippingAlert } });
//   }
//
//   const setShippingMethod = async (shippingMethod) => {
//     const { checkoutMutations: { onSetFulfillmentOption } } = props;
//     const { checkout: { fulfillmentGroups } } = props.cart;
//     const fulfillmentOption = {
//       fulfillmentGroupId: fulfillmentGroups[0]._id,
//       fulfillmentMethodId: shippingMethod.selectedFulfillmentOption.fulfillmentMethod._id
//     };
//     await onSetFulfillmentOption(fulfillmentOption);
//   };
//
//   const handlePaymentSubmit = (paymentInput) => {
//     props.cartStore.addCheckoutPayment(paymentInput);
//     setRState({
//       hasPaymentError: false,
//       actionAlerts: {
//         3: {}
//       }
//     });
//   };
//
//   const handlePaymentsReset = () => {
//     props.cartStore.resetCheckoutPayments();
//   }
//
//   const buildOrder = async () => {
//     const { cart, cartStore, orderEmailAddress } = props;
//     const cartId = cartStore.hasAccountCart ? cartStore.accountCartId : cartStore.anonymousCartId;
//     const { checkout } = cart;
//
//     const fulfillmentGroups = checkout.fulfillmentGroups.map((group) => {
//       const { data } = group;
//       const { selectedFulfillmentOption } = group;
//
//       const items = cart.items.map((item) => ({
//         addedAt: item.addedAt,
//         price: item.price.amount,
//         productConfiguration: item.productConfiguration,
//         quantity: item.quantity
//       }));
//
//       return {
//         data,
//         items,
//         selectedFulfillmentMethodId: selectedFulfillmentOption.fulfillmentMethod._id,
//         shopId: group.shop._id,
//         totalPrice: checkout.summary.total.amount,
//         type: group.type
//       };
//     });
//
//     const order = {
//       cartId,
//       currencyCode: checkout.summary.total.currency.code,
//       email: orderEmailAddress,
//       fulfillmentGroups,
//       shopId: cart.shop._id
//     };
//
//     return setRState({ isPlacingOrder: true }, () => this.placeOrder(order));
//   };
//
//   const placeOrder = async (order) => {
//     const { cartStore, clearAuthenticatedUsersCart, apolloClient } = props;
//
//     // Payments can have `null` amount to mean "remaining".
//     let remainingAmountDue = order.fulfillmentGroups.reduce((sum, group) => sum + group.totalPrice, 0);
//     const payments = cartStore.checkoutPayments.map(({ payment }) => {
//       const amount = payment.amount ? Math.min(payment.amount, remainingAmountDue) : remainingAmountDue;
//       remainingAmountDue -= amount;
//       return { ...payment, amount };
//     });
//
//     try {
//       const { data } = await apolloClient.mutate({
//         mutation: placeOrderMutation,
//         variables: {
//           input: {
//             order,
//             payments
//           }
//         }
//       });
//
//       // Placing the order was successful, so we should clear the
//       // anonymous cart credentials from cookie since it will be
//       // deleted on the server.
//       cartStore.clearAnonymousCartCredentials();
//       clearAuthenticatedUsersCart();
//
//       // Also destroy the collected and cached payment input
//       cartStore.resetCheckoutPayments();
//
//       const { placeOrder: { orders, token } } = data;
//
//       // Send user to order confirmation page
//       Router.push(`/checkout/order?orderId=${orders[0].referenceId}${token ? `&token=${token}` : ""}`);
//     } catch (error) {
//       if (_isMounted) {
//         setRState({
//           hasPaymentError: true,
//           isPlacingOrder: false,
//           actionAlerts: {
//             3: {
//               alertType: "error",
//               title: "Payment method failed",
//               message: error.toString().replace("Error: GraphQL error:", "")
//             }
//           }
//         });
//       }
//     }
//   };
//
//   const renderPlacingOrderOverlay = () => {
//     const { isPlacingOrder } = useState();
//
//     return (
//       <Dialog fullScreen disableBackdropClick={true} disableEscapeKeyDown={true} open={isPlacingOrder}>
//         <PageLoading delay={0} message="Placing your order..." />
//       </Dialog>
//     );
//   };
//
//
//
//   const { checkout: { fulfillmentGroups, summary } } = props.cart;
//   const { actionAlerts, hasPaymentError } = useState();
//   //const [fulfillmentGroup] = fulfillmentGroups;
//
//   // Order summary
//   const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = summary;
//   const checkoutSummary = {
//     displayShipping: fulfillmentTotal && fulfillmentTotal.displayAmount,
//     displaySubtotal: itemTotal.displayAmount,
//     displaySurcharge: surchargeTotal.displayAmount,
//     displayTotal: total.displayAmount,
//     displayTax: taxTotal && taxTotal.displayAmount,
//     items
//   };
//
//   const addresses = fulfillmentGroups.reduce((list, group) => {
//     if (group.shippingAddress) list.push(group.shippingAddress);
//     return list;
//   }, []);
//
//   const payments = cartStore.checkoutPayments.slice();
//   const remainingAmountDue = calculateRemainderDue(payments, total.amount);
//
//   let PaymentComponent = PaymentsCheckoutAction;
//   if (!Array.isArray(paymentMethods) || paymentMethods.length === 0) {
//     PaymentComponent = NoPaymentMethodsMessage;
//   }
//
//   const actions = [
//     {
//       id: "1",
//       activeLabel: "Enter a shipping address",
//       completeLabel: "Shipping address",
//       incompleteLabel: "Shipping address",
//       status: fulfillmentGroup.type !== "shipping" || fulfillmentGroup.shippingAddress ? "complete" : "incomplete",
//       component: ShippingAddressCheckoutAction,
//       onSubmit: setShippingAddress,
//       props: {
//         addressValidationResults,
//         alert: actionAlerts["1"],
//         fulfillmentGroup,
//         onAddressValidation: addressValidation
//       }
//     },
//     {
//       id: "2",
//       activeLabel: "Choose a shipping method",
//       completeLabel: "Shipping method",
//       incompleteLabel: "Shipping method",
//       status: fulfillmentGroup.selectedFulfillmentOption ? "complete" : "incomplete",
//       component: FulfillmentOptionsCheckoutAction,
//       onSubmit: setShippingMethod,
//       props: {
//         alert: actionAlerts["2"],
//         fulfillmentGroup
//       }
//     },
//     {
//       id: "3",
//       activeLabel: "Enter payment information",
//       completeLabel: "Payment information",
//       incompleteLabel: "Payment information",
//       status: remainingAmountDue === 0 && !hasPaymentError ? "complete" : "incomplete",
//       component: PaymentComponent,
//       onSubmit: handlePaymentSubmit,
//       props: {
//         addresses,
//         alert: actionAlerts["3"],
//         onReset: handlePaymentsReset,
//         payments,
//         paymentMethods,
//         remainingAmountDue
//       }
//     },
//     {
//       id: "4",
//       activeLabel: "Review and place order",
//       completeLabel: "Review and place order",
//       incompleteLabel: "Review and place order",
//       status: "incomplete",
//       component: FinalReviewCheckoutAction,
//       onSubmit: buildOrder,
//       props: {
//         alert: actionAlerts["4"],
//         checkoutSummary,
//         productURLPath: "/api/detectLanguage/product/"
//       }
//     }
//   ];

  //
  // {renderPlacingOrderOverlay()}
  // <Actions actions={actions} />
  return (
    <>
      <form>
      <CheckoutWrapper>
        <CheckoutContainer>
          <CheckoutInformation>

            {/* Login Form */}
            <InformationBox>
              <Heading>
                <FormattedMessage
                  id='loginCheckoutText'
                  defaultMessage='Login'
                />
              </Heading>
              <ButtonGroup>
                <RadioGroup
                  items={contact}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.type}
                      content={item.number}
                      checked={item.type === 'primary'}
                      onChange={() =>
                        dispatch({
                          type: 'SET_PRIMARY_CONTACT',
                          payload: item.id.toString(),
                        })
                      }
                      name='contact'
                      onEdit={() => handleEditDelete(item, 'edit', 'contact')}
                      onDelete={() =>
                        handleEditDelete(item, 'delete', 'contact')
                      }
                    />
                  )}
                />
              </ButtonGroup>
            </InformationBox>

            {/* DeliveryAddress */}
            <InformationBox>
              <Heading>
                <FormattedMessage
                  id='checkoutDeliveryAddress'
                  defaultMessage='Delivery Address'
                />
              </Heading>
              <ButtonGroup>
                <RadioGroup
                  items={address}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.name}
                      content={item.info}
                      name='address'
                      checked={item.type === 'primary'}
                      onChange={() =>
                        dispatch({
                          type: 'SET_PRIMARY_ADDRESS',
                          payload: item.id.toString(),
                        })
                      }
                      onEdit={() => handleEditDelete(item, 'edit', 'address')}
                      onDelete={() =>
                        handleEditDelete(item, 'delete', 'address')
                      }
                    />
                  )}
                  secondaryComponent={
                    <Button
                      className='addButton'
                      variant='text'
                      type='button'
                      onClick={() =>
                        handleModal(UpdateAddress, 'add-address-modal')
                      }
                    >
                      <IconWrapper>
                        <Plus width='10px' />
                      </IconWrapper>
                      <FormattedMessage id='addNew' defaultMessage='Add New' />
                    </Button>
                  }
                />
              </ButtonGroup>
            </InformationBox>

            {/* DeliverySchedule */}
            <InformationBox>
              <DeliverySchedule>
                <Heading>
                  <FormattedMessage
                    id='deliverySchedule'
                    defaultMessage='Select Your Delivery Schedule'
                  />
                </Heading>
                <RadioGroup
                  items={schedules}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.title}
                      content={item.time_slot}
                      name='schedule'
                      checked={item.type === 'primary'}
                      withActionButtons={false}
                      onChange={() =>
                        dispatch({
                          type: 'SET_PRIMARY_SCHEDULE',
                          payload: item.id.toString(),
                        })
                      }
                    />
                  )}
                />
              </DeliverySchedule>
              <Header>
                <SavedCard>
                  <FormattedMessage id="deliveryContactId" defaultMessage="Contact for Delivery" />
                </SavedCard>

                <Button
                  variant="text"
                  type="button"
                  className="addCard"
                >
                  <IconWrapper>
                    <Plus width="10px" />
                  </IconWrapper>
                  <FormattedMessage id="addContactBtn" defaultMessage="Add Contact" />
                </Button>
              </Header>
              <ButtonGroup>
                <RadioGroup
                  items={contact}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.type}
                      content={item.number}
                      checked={item.type === 'primary'}
                      onChange={() =>
                        dispatch({
                          type: 'SET_PRIMARY_CONTACT',
                          payload: item.id.toString(),
                        })
                      }
                      name='contact'
                      onEdit={() => handleEditDelete(item, 'edit', 'contact')}
                      onDelete={() =>
                        handleEditDelete(item, 'delete', 'contact')
                      }
                    />
                  )}
                />
              </ButtonGroup>
            </InformationBox>


            {/* PaymentOption */}
            <InformationBox
              className='paymentBox'
              style={{ paddingBottom: 30 }}
            >
              <Heading>
                <FormattedMessage
                  id='selectPaymentText'
                  defaultMessage='Select Payment Option'
                />
              </Heading>
              <PaymentGroup
                name='payment'
                deviceType={deviceType}
                items={card}
                onEditDeleteField={(item: any, type: string) =>
                  handleEditDelete(item, type, 'payment')
                }
                onChange={(item: any) =>
                  dispatch({
                    type: 'SET_PRIMARY_CARD',
                    payload: item.id.toString(),
                  })
                }
                handleAddNewCard={() => {
                  handleModal(
                    StripePaymentForm,
                    { totalPrice: calculatePrice() },
                    'add-address-modal stripe-modal'
                  );
                }}
              />

              {/* Coupon start */}
              {coupon ? (
                <CouponBoxWrapper>
                  <CouponCode>
                    <FormattedMessage id='couponApplied' />
                    <span>{coupon.code}</span>

                    <RemoveCoupon
                      onClick={(e) => {
                        e.preventDefault();
                        removeCoupon();
                        setHasCoupon(false);
                      }}
                    >
                      <FormattedMessage id='removeCoupon' />
                    </RemoveCoupon>
                  </CouponCode>
                </CouponBoxWrapper>
              ) : (
                <CouponBoxWrapper>
                  {!hasCoupon ? (
                    <HaveCoupon onClick={() => setHasCoupon((prev) => !prev)}>
                      <FormattedMessage
                        id='specialCode'
                        defaultMessage='Have a special code?'
                      />
                    </HaveCoupon>
                  ) : (
                    <>
                      <CouponInputBox>
                        <Input
                          onUpdate={handleOnUpdate}
                          value={couponCode}
                          intlPlaceholderId='couponPlaceholder'
                        />
                        {/* <Button
                          onClick={handleApplyCoupon}
                          title='Apply'
                          intlButtonId='voucherApply'
                        /> */}
                        <Button
                          type='button'
                          onClick={handleApplyCoupon}
                          size='big'
                        >
                          <FormattedMessage
                            id='voucherApply'
                            defaultMessage='Apply'
                          />
                        </Button>
                      </CouponInputBox>

                      {couponError && (
                        <ErrorMsg>
                          <FormattedMessage
                            id='couponError'
                            defaultMessage={couponError}
                          />
                        </ErrorMsg>
                      )}
                    </>
                  )}
                </CouponBoxWrapper>
              )}

              <TermConditionText>
                <FormattedMessage
                  id='termAndConditionHelper'
                  defaultMessage='By making this purchase you agree to our'
                />
                <Link href='#'>
                  <TermConditionLink>
                    <FormattedMessage
                      id='termAndCondition'
                      defaultMessage='terms and conditions.'
                    />
                  </TermConditionLink>
                </Link>
              </TermConditionText>

              {/* CheckoutSubmit */}
              <CheckoutSubmit>
                {/* <Button
                  onClick={handleSubmit}
                  type='button'
                  disabled={!isValid}
                  title='Proceed to Checkout'
                  intlButtonId='proceesCheckout'
                  loader={<Loader />}
                  isLoading={loading}
                /> */}

                <Button
                  type='button'
                  onClick={handleSubmit}
                  disabled={!isValid}
                  size='big'
                  loading={loading}
                  style={{ width: '100%' }}
                >
                  <FormattedMessage
                    id='proceesCheckout'
                    defaultMessage='Proceed to Checkout'
                  />
                </Button>
              </CheckoutSubmit>
            </InformationBox>
          </CheckoutInformation>

          <CartWrapper>
            {/* <Sticky enabled={true} top={totalHeight} innerZ={999}> */}
            <Sticky
              enabled={size.width >= 768 ? true : false}
              top={120}
              innerZ={999}
            >
              <OrderInfo>
                <Title>
                  <FormattedMessage
                    id='cartTitle'
                    defaultMessage='Your Order'
                  />
                </Title>

                <Scrollbars
                  universal
                  autoHide
                  autoHeight
                  autoHeightMax='390px'
                  renderView={(props) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        marginLeft: isRtl ? props.style.marginRight : 0,
                        marginRight: isRtl ? 0 : props.style.marginRight,
                        paddingLeft: isRtl ? 15 : 0,
                        paddingRight: isRtl ? 0 : 15,
                      }}
                    />
                  )}
                >
                  <ItemsWrapper>
                    {props.cart.items.length > 0 ? (
                      props.cart.items.map((item) => (
                        <OrderItem key={`cartItem-${item._id}`} product={item} />
                      ))
                    ) : (
                      <NoProductMsg>
                        <FormattedMessage
                          id='noProductFound'
                          defaultMessage='No products found'
                        />
                      </NoProductMsg>
                    )}
                  </ItemsWrapper>
                </Scrollbars>

                <CalculationWrapper>
                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='subTotal'
                        defaultMessage='Subtotal'
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculateSubTotalPrice()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='intlOrderDetailsDelivery'
                        defaultMessage='Delivery Fee'
                      />
                    </Text>
                    <Text>{CURRENCY}0.00</Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='discountText'
                        defaultMessage='Discount'
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculateDiscount()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper style={{ marginTop: 20 }}>
                    <Bold>
                      <FormattedMessage id='totalText' defaultMessage='Total' />{' '}
                      <Small>
                        (
                        <FormattedMessage
                          id='vatText'
                          defaultMessage='Incl. VAT'
                        />
                        )
                      </Small>
                    </Bold>
                    <Bold>
                      {CURRENCY}
                      {calculatePrice()}
                    </Bold>
                  </TextWrapper>
                </CalculationWrapper>
              </OrderInfo>
            </Sticky>
          </CartWrapper>
        </CheckoutContainer>
      </CheckoutWrapper>
    </form>
    </>
  );
};

export default withAddressValidation(CheckoutWithSidebar);
