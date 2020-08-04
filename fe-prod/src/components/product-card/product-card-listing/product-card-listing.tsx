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

  return (
    <ProductCardWrapper onClick={onClick} >
      <ProgressiveImage presrc={image} src={image} imgH={props.imgH} imgW={props.imgW} fit={"fit-content"}/>
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

          {true ? (
            <Button
              className="cart-button"
              variant="secondary"
              borderRadius={100}
            >
              <CartIcon mr={2} />
              <ButtonText>
                <FormattedMessage id="addCartButton" defaultMessage="Cart" />
              </ButtonText>
            </Button>
          ) : (
            <Counter
              value={1}
            />
          )}
        </div>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default (inject('uiStore')(ProductCard));
