import React from 'react';
import dynamic from 'next/dynamic';
import NavLink from 'components/nav-link/nav-link';
import { OFFER_PAGE, HELP_PAGE } from 'constants/navigation';
import LanguageSwitcher from '../language-switcher/language-switcher';
import { HelpIcon } from 'assets/icons/HelpIcon';
import { RightMenuBox } from './right-menu.style';
const AuthMenu = dynamic(() => import('../auth-menu'), { ssr: false });

type Props = {
  onLogout: () => void;
  onJoin: () => void;
  avatar: string;
  isAuthenticated: boolean;
};

export const RightMenu: React.FC<Props> = ({
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
}) => {
  return (
    <RightMenuBox>
      <NavLink
        className="menu-item"
        href={OFFER_PAGE}
        label="Offer"
        intlId="navlinkOffer"
      />
      <NavLink
        className="menu-item"
        href={HELP_PAGE}
        label="Need Help"
        intlId="navlinkHelp"
        iconClass="menu-icon"
        icon={<HelpIcon />}
      />
      <LanguageSwitcher />

      <AuthMenu
        avatar={avatar}
        onJoin={onJoin}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />
    </RightMenuBox>
  );
};
