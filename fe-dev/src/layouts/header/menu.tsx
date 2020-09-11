import React, { useContext } from 'react';
import { openModal, closeModal } from '@redq/reuse-modal';
import Router from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars';
import Drawer from 'src/components/drawer/drawer';
import { Button } from 'src/components/button/button';
import NavLink from 'src/components/nav-link/nav-link';
import { CloseIcon } from 'src/assets/icons/CloseIcon';
import { AuthContext } from 'src/contexts/auth/auth.context';
import AuthenticationForm from 'src/features/authentication-form';
import { FormattedMessage } from 'react-intl';
import {
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
  DrawerProfile,
  LogoutView,
  LoginView,
  UserAvatar,
  UserDetails,
  DrawerMenu,
  DrawerMenuItem,
  UserOptionMenu,
} from './header.style';
import UserImage from 'src/assets/images/user.jpg';

import {
  PROCEED_TO_CHECKOUT_PAGE,
  ALTERNATIVE_CHECKOUT_PAGE,
  PROFILE_PAGE,
  YOUR_ORDER,
  ORDER_RECEIVED,
  HELP_PAGE,
  OFFER_PAGE,
  TERMS,
  PRIVACY,
} from 'src/constants/navigation';
import { useAppState, useAppDispatch } from 'src/contexts/app/app.provider';

const DrawerMenuItems = [
  {
    id: 1,
    intlLabelId: 'navLinkHome',
    label: 'Home',
    href: '/',
  },
  {
    id: 2,
    intlLabelId: 'navlinkCheckout',
    label: 'Checkout',
    href: PROCEED_TO_CHECKOUT_PAGE,
  },
  {
    id: 3,
    label: 'Checkout Second',
    intlLabelId: 'alternativeCheckout',
    href: ALTERNATIVE_CHECKOUT_PAGE,
  },
  {
    id: 4,
    intlLabelId: 'navlinkProfile',
    label: 'Profile',
    href: PROFILE_PAGE,
  },
  {
    id: 5,
    intlLabelId: 'sidebarYourOrder',
    label: 'Order',
    href: YOUR_ORDER,
  },
  {
    id: 6,
    intlLabelId: 'navlinkOrderReceived',
    label: 'Received',
    href: ORDER_RECEIVED,
  },
  {
    id: 7,
    intlLabelId: 'navlinkHelp',
    label: 'Help',
    href: HELP_PAGE,
  },
  {
    id: 8,
    intlLabelId: 'navlinkOffer',
    label: 'Offer',
    href: OFFER_PAGE,
  },
  {
    id: 9,
    href: TERMS,
    label: 'Terms and Services',
    intlLabelId: 'navlinkTermsAndServices',
  },
  {
    id: 10,
    href: PRIVACY,
    label: 'Privacy Policy',
    intlLabelId: 'navlinkPrivacyPolicy',
  },
];

const Menu: React.FunctionComponent = () => {

  const isDrawerOpen = useAppState('isDrawerOpen');
  const dispatch = useAppDispatch();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);
  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: 'TOGGLE_DRAWER',
    });
  }, [dispatch]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
  };

/*
  React.useEffect(() => {
    window.addEventListener("GuestAuthSuccess", (e)=>{
      closeModal()
      console.log(e, "areeee had h be ye kaam krne lag gya bc")
    }, false);
  });
*/

  const signInOutForm = () => {
    dispatch({
      type: 'TOGGLE_DRAWER',
    });

    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 410
      },
    });
  };

  return (
    <>
    <Drawer
      width="316px"
      drawerHandler={
        <HamburgerIcon>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      }
      open={isDrawerOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <DrawerClose>
          <CloseIcon />
        </DrawerClose>
      }
    >
      <Scrollbars autoHide>
        <DrawerContentWrapper >
          <DrawerProfile>
            {isAuthenticated ? (
              <LoginView>
                <UserAvatar>
                  <img src={UserImage} alt="user_avatar" />
                </UserAvatar>
                <UserDetails>
                  <h3>David Kinderson</h3>
                  <span>+990 374 987</span>
                </UserDetails>
              </LoginView>
            ) : (
              <LogoutView>
                <Button variant="primary" onClick={signInOutForm}>
                  <FormattedMessage
                    id="mobileSignInButtonText"
                    defaultMessage="join"
                  />
                </Button>
              </LogoutView>
            )}
          </DrawerProfile>

          <DrawerMenu>
            {DrawerMenuItems.map((item) => (
              <DrawerMenuItem key={item.id}>
                <NavLink
                  onClick={toggleHandler}
                  href={item.href}
                  label={item.label}
                  intlId={item.intlLabelId}
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
            ))}
          </DrawerMenu>

          {isAuthenticated && (
            <UserOptionMenu>
              <DrawerMenuItem>
                <NavLink
                  href="/profile"
                  label="Your Account Settings"
                  className="drawer_menu_item"
                  intlId="navlinkAccountSettings"
                />
              </DrawerMenuItem>
              <DrawerMenuItem>
                <div onClick={handleLogout} className="drawer_menu_item">
                  <span className="logoutBtn">
                    <FormattedMessage
                      id="navlinkLogout"
                      defaultMessage="Logout"
                    />
                  </span>
                </div>
              </DrawerMenuItem>
            </UserOptionMenu>
          )}
        </DrawerContentWrapper>
      </Scrollbars>
    </Drawer>
      </>
  );
};

export default Menu;
