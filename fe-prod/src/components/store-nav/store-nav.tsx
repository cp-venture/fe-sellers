import React from 'react';
import NavLink from 'components/nav-link/nav-link';
import StoreNavWrapper, { StoreNavLinks } from './store-nav.style';
import { GroceryIcon } from 'assets/icons/GroceryIcon';
import { MakeupIcon } from 'assets/icons/MakeupIcon';
import { DressIcon } from 'assets/icons/DressIcon';
import { Handbag } from 'assets/icons/Handbag';

type StoreNavProps = {
  className?: string;
  items?: any[];
};

const StoreNav: React.FunctionComponent<StoreNavProps> = ({
  className,
  items = [],
}) => {
  return (
    <StoreNavWrapper className={className}>
      <StoreNavLinks>
        {items.map((item, index) => (
          <NavLink
            className="store-nav-link"
            href={item.link}
            label={item.label}
            icon={item.icon}
            key={index}
          />
        ))}
      </StoreNavLinks>
    </StoreNavWrapper>
  );
};

export default StoreNav;
