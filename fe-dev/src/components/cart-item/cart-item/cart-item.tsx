import React from 'react';
import { Counter } from 'components/counter/counter';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { CURRENCY } from 'utils/constant';
import {
  ItemBox,
  Image,
  Information,
  Name,
  Price,
  Weight,
  Total,
  RemoveButton,
} from './cart-item.style';

interface Props {
  data: any;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<Props> = ({
  data,
  onDecrement,
  onIncrement,
  onRemove,
}) => {
  const { title, imageURLs, price, optionTitle, quantity, metafields } = data;
  const displayPrice = price.displayAmount;
  //const media = JSON.parse(metafields[0].value)
  return (
    <ItemBox>
      {/*<Counter
        value={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        variant="lightVertical"
      />*/}
      <Image src={""} />
      <Information>
        <Name>{title}</Name>
        <Weight>
          Customisable {optionTitle}
        </Weight>
      </Information>
      <Total>
        <Price>
        {CURRENCY}
        {(quantity * price.amount).toFixed(2)}
        </Price>
      </Total>
      <RemoveButton onClick={onRemove}>
        <CloseIcon />
      </RemoveButton>
    </ItemBox>
  );
};
