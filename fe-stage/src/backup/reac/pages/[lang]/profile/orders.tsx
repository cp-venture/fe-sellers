import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "../fe-prod/src/reaction/hocs/inject";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ProfileMenu from "../fe-prod/src/reaction/components/ProfileMenu";
import ProfileOrders from "../fe-prod/src/reaction/components/ProfileOrders";
import Layout from "../fe-prod/src/reaction/components/Layout";
import withAddressBook from "../fe-prod/src/reaction/containers/address/withAddressBook";
import { withApollo } from "../fe-prod/src/reaction/lib/apollo/withApollo";

import { locales } from "../fe-prod/src/reaction/translations/config";
import fetchPrimaryShop from "../fe-prod/src/reaction/staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "../fe-prod/src/reaction/staticUtils/translations/fetchTranslations";

import ErrorPage from "src/backup/reac/pages/_error";

const styles = (theme) => ({
  accountProfileInfoContainer: {
    marginBottom: theme.spacing(4)
  }
});

class ProfileOrdersPage extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      account: PropTypes.object.isRequired
    }),
    classes: PropTypes.object,
    onAddressAdded: PropTypes.func.isRequired,
    onAddressDeleted: PropTypes.func.isRequired,
    onAddressEdited: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  renderMainContent() {
    return <ProfileOrders />;
  }

  render() {
    const { authStore: { account }, router, shop } = this.props;

    // If there is no logged in user, return Not Found page
    if (account && !account._id) {
      return (
        <Layout shop={shop}>
          <ErrorPage shop={shop} subtitle="Not Found" />
        </Layout>
      );
    }

    return (
      <Layout shop={shop}>
        <Helmet
          title={`My Orders | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section>
          <Grid container spacing={3}>
            <Grid item xs={false} md={1} /> {/* MUI grid doesn't have an offset. Use blank grid item instead. */}
            <Grid item xs={12} md={3}>
              <ProfileMenu router={router} />
            </Grid>
            <Grid item xs={12} md={7}>
              {this.renderMainContent()}
            </Grid>
            <Grid item xs={false} md={1} /> {/* MUI grid doesn't have an offset. Use blank grid item instead. */}
          </Grid>
        </section>
      </Layout>
    );
  }
}

/**
 *  Static props for the orders route
 * @param {String} lang - the shop's language
 * @returns {Object} props
 */
export async function getStaticProps({ params: { lang } }) {
  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common"])
    }
  };
}

/**
 *  Static paths for the orders route
 * @returns {Object} the static paths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false
  };
}

export default withApollo()(withStyles(styles)(withAddressBook(inject("authStore", "uiStore")(ProfileOrdersPage))));