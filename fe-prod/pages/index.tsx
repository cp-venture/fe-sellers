import { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {withApollo} from "lib/apollo/withApollo";
import inject from 'hocs/inject'

// the redirect will only happen on the client-side. This is by design,
const IndexPage: React.FC<{}> = () => {
  useEffect(() => {
    Router.replace('/[type]', '/grocery');
  });
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default withApollo()(inject(["routingStore", "uiStore"])(IndexPage));
