// product card for general
import React from 'react';
import Image from 'components/image/image';
import { Button } from 'components/button/button';
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  DiscountPercent,
  ButtonText,
} from './product-card.style';
import useCart from 'hooks/cart/useCart';
import { Counter } from 'components/counter/counter';
import { cartAnimation } from 'utils/cart-animation';
import { FormattedMessage } from 'react-intl';
import { CartIcon } from 'assets/icons/CartIcon';
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import variantById from "lib/utils/variantById";
import inject from "hocs/inject";
import withCart from "containers/cart/withCart";
import ProgressiveImage from "components/ProgressiveImage";

type ProductCardProps = {
  title: string;
  image: any;
  weight: string;
  currency: string;
  description: string;
  price: number;
  salePrice?: number;
  discountInPercent?: number;
  data: any;
  imgH: string;
  imgW: string;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  cartProducts?: any;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
  product_data?: any;
  uiStore?: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
                                                   title,
                                                   image,
                                                   weight,
                                                   price,
                                                   salePrice,
                                                   discountInPercent,
                                                   cartProducts,
                                                   addToCart,
                                                   updateCart,
                                                   value,
                                                   currency,
                                                   onChange,
                                                   increment,
                                                   decrement,
                                                   product_data,
                                                   deviceType,
                                                   onClick, uiStore: { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId, setPDPSelectedVariantId },
                                                   ...props
                                                 }) => {

  const { addItemsToCart, onRemoveCartItems, cart } = useCart();
  const product = product_data
  const currencyCode = "USD"
  let selectedVariant, selectedOption;

  const selectVariant = (variant, optionId) => {// Select the variant, and if it has options, the first option
    const variantId = variant._id;
    let selectOptionId = optionId;
    if (!selectOptionId && variant.options && variant.options.length) {
      selectOptionId = variant.options[0]._id;
    }
    selectedVariant = variantById(product.variants, variantId);
    selectedOption = variantById(selectedVariant.options, selectOptionId);
    //setPDPSelectedVariantId(variantId, selectOptionId);
  }

  const determineProductPrice = ()=>{
    let productPrice;
    if (selectedOption && selectedVariant) {
      productPrice = priceByCurrencyCode(currencyCode, selectedOption.pricing);
    } else if (!selectedOption && selectedVariant) {
      productPrice = priceByCurrencyCode(currencyCode, selectedVariant.pricing);
    }
    return productPrice;
  }

  selectVariant(product.variants[0], null);

  const productPrice = determineProductPrice();
  //const compareAtDisplayPrice = (productPrice.compareAtPrice && productPrice.compareAtPrice.displayAmount) || null;

  const handleAddClick = (e) => {
    e.stopPropagation();
    cartAnimation(e);
    //--console.log(price)
    const selectedVariantOrOption = selectedOption || selectedVariant;

    // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
    let quantity = 1.0
    addItemsToCart([
      {
        price: {
          amount: productPrice.price,
          currencyCode
        },
        productConfiguration: {
          productId: product.productId, // Pass the productId, not to be confused with _id
          productVariantId: selectedVariantOrOption.variantId // Pass the variantId, not to be confused with
        },
        quantity
      }
    ]);
    if (!isInCart(89)) {
       cartAnimation(e);
    }
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    //onRemoveCartItems(data);
  };
  const isInCart = (_id: number)=>{
    return false
  }

  return (
    <ProductCardWrapper onClick={onClick} className="product-card">
      <ProgressiveImage className="product-image" presrc={image} src={image} imgH={props.imgH} imgW={props.imgW} fit={"fit-content"}/>
        {discountInPercent ? (
          <div>
            <DiscountPercent>{discountInPercent}%</DiscountPercent>
          </div>
        ) : (
          ''
        )}
      <ProductInfo>
        <h3 className="product-title">{title}</h3>
        <span className="product-weight">{weight}</span>
        <div className="product-meta">
          <div className="productPriceWrapper">
            {discountInPercent ? (
              <span className="discountedPrice">
                {currency}
              </span>
            ) : (
              ''
            )}
            <span className="product-price">
              {currency}
            </span>
          </div>

          {!isInCart(78) ? (
            <Button
              className="cart-button"
              variant="secondary"
              borderRadius={100}
              onClick={handleAddClick}
            >
              <CartIcon mr={2} />
              <ButtonText>
                <FormattedMessage id="addCartButton" defaultMessage="Cart" />
              </ButtonText>
            </Button>
          ) : (
            <Counter
              onDecrement= {(e) => {}}
              onIncrement= {(e) => {}}
              value={1}
            />
          )}
        </div>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default (inject('uiStore')(ProductCard));
