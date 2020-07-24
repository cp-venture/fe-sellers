import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  CouponBoxWrapper,
  Input,
  Button,
  Display,
  CouponCode,
  DiscountPrice,
  CancelBtn,
} from './coupon-box.style';
import { CloseIcon } from 'assets/icons/CloseIcon';

type CouponBoxProps = {
  onUpdate?: Function;
  onClick?: any;
  value?: any;
  disabled?: any;
  buttonTitle: string;
  className?: string;
  couponPlaceholder?: string;
  intlCouponBoxPlaceholder?: string;
  intlCouponApplyButton?: string;
  style?: any;
};

const CouponBox: React.FC<CouponBoxProps> = ({
  onUpdate,
  value,
  onClick,
  disabled,
  buttonTitle,
  intlCouponBoxPlaceholder,
  intlCouponApplyButton,
  className,
  style,
  couponPlaceholder,
}) => {
  return (
    <CouponBoxWrapper className={className} style={style}>
      <Input
        onUpdate={onUpdate}
        value={value}
        placeholder={couponPlaceholder}
        intlPlaceholderId={
          intlCouponBoxPlaceholder
            ? intlCouponBoxPlaceholder
            : 'intlCouponBoxPlaceholder'
        }
      />
      <Button
        type="button"
        onClick={onClick}
        disabled={disabled}
        style={{ padding: '0 30px' }}
      >
        <FormattedMessage
          id={intlCouponApplyButton}
          defaultMessage={buttonTitle}
        />
      </Button>
    </CouponBoxWrapper>
  );
};

type CouponDisplayProps = {
  onClick?: any;
  code?: string;
  sign?: string;
  currency?: string;
  price?: number;
  style?: any;
  btnStyle?: any;
};

export const CouponDisplay: React.FC<CouponDisplayProps> = ({
  code,
  currency,
  price,
  sign,
  onClick,
  style,
  btnStyle,
}) => {
  return (
    <Display style={style} className="couponDisplayBox">
      <CouponCode className="couponCodeText">{code}</CouponCode>
      <DiscountPrice className="discountedPrice">
        {sign}
        {currency}
        {price}
      </DiscountPrice>
      <CancelBtn onClick={onClick} style={btnStyle}>
        <CloseIcon />
      </CancelBtn>
    </Display>
  );
};

export default CouponBox;
