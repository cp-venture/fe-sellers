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
} from '../product-card.style';
import useCart from 'hooks/cart/useCart';
import { Counter } from 'components/counter/counter';
import { cartAnimation } from 'utils/cart-animation';
import { FormattedMessage } from 'react-intl';
import { CartIcon } from 'assets/icons/CartIcon';
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import variantById from "lib/utils/variantById";
import inject from "hocs/inject";

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
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  cartProducts?: any;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
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
  data,
  deviceType,
  onClick, uiStore: { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId, setPDPSelectedVariantId },
  ...props
}) => {
  const { addItemsToCart, onRemoveCartItems, cart } = useCart();
  const handleAddClick = (e) => {
    e.stopPropagation();
    cartAnimation(e);

    const product = data
    let selectedVariant
    const selectVariant = (variant, optionId) => {

      // Select the variant, and if it has options, the first option
      const variantId = variant._id;
      let selectOptionId = optionId;
      if (!selectOptionId && variant.options && variant.options.length) {
          selectOptionId = variant.options[0]._id;
      }
      selectedVariant = variantId
      setPDPSelectedVariantId(variantId, selectOptionId);
    }
    selectVariant(product.variants[0], null);


    // const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
    const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
    const selectedVariantOrOption = selectedOption || selectedVariant;
    const currencyCode = "USD"
    const price = priceByCurrencyCode(currencyCode, product.pricing);
    // price.price

    // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
    const quantity = 1
    addItemsToCart([
      {
        price: {
          amount: price.price,
          currencyCode
        },
        productConfiguration: {
          productId: product._id, // Pass the productId, not to be confused with _id
          productVariantId: selectedVariantOrOption.variantId // Pass the variantId, not to be confused with _id
        },
        quantity
      }
    ]);
    // if (!isInCart(data.id)) {
    //   cartAnimation(e);
    // }
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    onRemoveCartItems(data);
  };
  const isInCart = (_id: number)=>{
    return true
  }
  return (
    <ProductCardWrapper onClick={onClick} className="product-card">
      <ProductImageWrapper>
        <Image
          url={image}
          className="product-image"
          style={{ position: 'relative' }}
          alt={title}
        />
        {discountInPercent ? (
          <>
            <DiscountPercent>{discountInPercent}%</DiscountPercent>
          </>
        ) : (
          ''
        )}
      </ProductImageWrapper>
      <ProductInfo>
        <h3 className="product-title">{title}</h3>
        <span className="product-weight">{weight}</span>
        <div className="product-meta">
          <div className="productPriceWrapper">
            {discountInPercent ? (
              <span className="discountedPrice">
                {currency}
                {price}
              </span>
            ) : (
              ''
            )}

            <span className="product-price">
              {currency}
              {salePrice ? salePrice : price}
            </span>
          </div>

          {!isInCart(data.id) ? (
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
              value={1}
              onDecrement={handleRemoveClick}
              onIncrement={handleAddClick}
            />
          )}
        </div>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default inject('uiStore')(ProductCard);
