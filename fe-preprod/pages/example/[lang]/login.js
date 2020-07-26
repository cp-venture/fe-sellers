import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "translations/i18nRouter";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import CheckoutTopHat from "@reactioncommerce/components/CheckoutTopHat/v1";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import withCart from "reaction-containers/cart/withCart";
import Entry from "reaction-components/Entry";
import Link from "reaction-components/Link";
import Layout from "reaction-components/Layout";
import ChevronLeftIcon from "mdi-material-ui/ChevronLeft";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";

const styles = (theme) => ({
  backLink: {
    "cursor": "pointer",
    "fontFamily": theme.typography.fontFamily,
    "fontSize": 14
  },
  backLinkText: {
    letterSpacing: "0.3px",
    lineHeight: 1.71,
    marginLeft: theme.spacing(),
    textDecoration: "underline"
  },
  headerFlex: {
    alignSelf: "center",
    flex: "1 1 1%"
  },
  header: {
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3)
  },
  logo: {
    margin: "auto"
  },
  main: {
    flex: "1 1 auto",
    maxWidth: theme.layout.mainLoginMaxWidth,
    minHeight: "calc(100vh - 135px)",
    margin: "0 auto",
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(10, 3, 0)
    }
  },
  root: {}
});

class Login extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      account: PropTypes.object,
      email: PropTypes.string
    }),
    classes: PropTypes.object,
    setEmailOnAnonymousCart: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    theme: PropTypes.object.isRequired
  };

  state = {};

  componentDidMount() {
    const { cart } = this.props;
    if ((cart && cart.account !== null) || (cart && cart.email)) Router.back();
  }

  renderHeader() {
    const { classes, shop } = this.props;

    return (
      <div className={classes.header}>
        <div className={classes.headerFlex}>
          <Link route="/" className={classes.backLink}>
            <ChevronLeftIcon style={{ fontSize: 18, color: "inherit", verticalAlign: "sub", transition: "none" }} />
            <span className={classes.backLinkText}>Back</span>
          </Link>
        </div>

        <Link route="home">
          <div className={classes.logo}>
            {shop ? <ShopLogo shopName={shop.name} /> : "Example Storefront"}
          </div>
        </Link>

        <div className={classes.headerFlex} />
      </div>
    );
  }

  renderEntry() {
    const { setEmailOnAnonymousCart } = this.props;
    return <Entry setEmailOnAnonymousCart={setEmailOnAnonymousCart} />;
  }

  render() {
    const { classes, shop } = this.props;
    return (
      <Layout shop={shop}>
        <Helmet
          title={`Login | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <CheckoutTopHat checkoutMessage="Free Shipping + Free Returns" />
        <div >
          {this.renderHeader()}
          <main>{this.renderEntry()}</main>
        </div>
      </Layout>
    );
  }
}

/**
 *  Static props for the login
 *
 * @returns {Object} the props
 */
export async function getStaticProps() {
  return {
    props: {
    }
  };
}

/**
 *  Static paths for the login
 *
 * @returns {Object} thepaths
 */
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export default Login;
