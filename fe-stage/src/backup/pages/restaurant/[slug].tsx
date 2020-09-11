import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import ProductDetailsFood from '../fe-prod/src/components/product-details/product-details-three/product-details-three';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
  ProductSingleContainer,
} from '../fe-prod/src/assets/styles/product-single.style';
import { GET_VENDOR } from '../fe-prod/src/graphql/query/vendor.query';
import { SEO } from '../fe-prod/src/components/seo';
import ErrorMessage from '../fe-prod/src/components/error-message/error-message';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductPage: NextPage<Props> = ({ deviceType }) => {
  const {
    query: { slug },
  } = useRouter();

  const { data, error, loading } = useQuery(GET_VENDOR, {
    variables: { slug },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <SEO
        title={`${data?.vendor?.name} - PickBazar`}
        description={`${data?.vendor?.name} Details`}
      />
      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            <ProductDetailsFood
              product={data?.vendor}
              deviceType={deviceType}
            />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};
export default ProductPage;
