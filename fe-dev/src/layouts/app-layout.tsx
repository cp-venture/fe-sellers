import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Sticky from 'react-stickynode';
import { useAppState } from 'contexts/app/app.provider';
import Header from './header/header';
import { LayoutWrapper } from './layout.style';
import { isCategoryPage } from './is-home-page';
import useStores from "hooks/useStores";
import Grid from '@material-ui/core/Grid';
import Sidebar from 'react-sidebar';
const MobileHeader = dynamic(() => import('./header/mobile-header'), {
  ssr: false,
});

const SidebarMenu = dynamic(() => import('src/layouts/sidebar/sidebarMenu'));

// type LayoutProps = {
//   className?: string;
//   token?: string;
//   children?: any;
//
// };

const Layout = ({
  className,
  children,
  token,
deviceType
}) => {
  // console.log(JSON.stringify(deviceType))

  const {uiStore} = useStores();
  const [isMenu, setMenu] = React.useState(true)

  React.useEffect(() => {
    setMenu(uiStore.isMenuDrawerOpen)
  }, [uiStore.isMenuDrawerOpen]);

  const isSticky = useAppState('isSticky');
  const { pathname, query } = useRouter();
  const type = pathname === '/restaurant' ? 'restaurant' : query.type;

  const isHomePage = isCategoryPage(type);
  return (
      <LayoutWrapper >
        <Sticky enabled={isSticky} innerZ={1001}>
          <MobileHeader
            className={`${isSticky ? 'sticky' : 'unSticky'} ${
              isHomePage ? 'home' : ''
            } desktop`}
          />
          <Header
            className={`${isSticky && isHomePage ? 'sticky' : 'unSticky'} ${
              isHomePage ? 'home' : ''
            }`}
          />
        </Sticky>
        {/*<Grid container>*/}
        {/*  <Grid  item xs={2} style={isMenu ? {} : { display: 'none' }}>*/}
        {/*    <div style={{background: "#fff", height: "100%"}}>*/}
        {/*      <SidebarMenu type={'grocery'} deviceType={{desktop: true, mobile: 'false', tablet: 'false'}}  />*/}
        {/*    </div>*/}
        {/*  </Grid>*/}
        {/*  <Grid  item xs={isMenu ? 10:12} >*/}
        {/*    {children}*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}


        <Sidebar
          sidebar={
            <div style={{background: "#fff", height: "100%"}}>
              <SidebarMenu type={'grocery'} deviceType={deviceType}  />
            </div>
          }
          touchHandleWidth={50}
          dragToggleDistance={10}
          docked={isMenu && !deviceType.mobile}
          open={isMenu}
          shadow={!deviceType.mobile}
          onSetOpen={setMenu}
          contentId={"XXgscrollXX"}
          styles={{ body: { background: '#f7f7f7 !important' } }}>
              {children}
          </Sidebar>
      </LayoutWrapper>
  );
};

export default Layout;
