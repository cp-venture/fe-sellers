import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { SEO } from '../fe-prod/src/components/seo';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
  ProductSingleContainer,
} from '../fe-prod/src/assets/styles/product-single.style';
import { GET_PRODUCT_DETAILS } from '../fe-prod/src/graphql/query/product.query';
import { initializeApollo } from '../fe-prod/src/utils/apollo';

const ProductDetails = dynamic(() =>
  import('../fe-prod/src/components/product-details/product-details-one/product-details-one')
);
const ProductDetailsBook = dynamic(() =>
  import('../fe-prod/src/components/product-details/product-details-two/product-details-two')
);
const CartPopUp = dynamic(() => import('../fe-prod/src/features/carts/cart-popup'), {
  ssr: false,
});

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  [key: string]: any;
};

const ProductPage: NextPage<Props> = ({ data, deviceType }) => {
  let content = (
    <ProductDetails product={data.product} deviceType={deviceType} />
  );
  if (data.product.type === 'BOOK') {
    content = (
      <ProductDetailsBook product={data.product} deviceType={deviceType} />
    );
  }

  return (
    <>
      <SEO
        title={`${data.product.title} - PickBazar`}
        description={`${data.product.title} Details`}
      />

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            {content}
            <CartPopUp deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};
export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_PRODUCT_DETAILS,
    variables: {
      slug: params.slug,
    },
  });
  return {
    props: {
      data,
    },
  };
}
export default ProductPage;