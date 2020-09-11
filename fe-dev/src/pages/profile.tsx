// @ts-nocheck
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { GET_LOGGED_IN_CUSTOMER } from 'graphql/query/customer.query';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import SettingsContent from 'features/user-profile/settings/settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'features/user-profile/user-profile.style';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import { SEO } from 'components/seo';
import Footer from 'layouts/footer';
import ErrorMessage from 'components/error-message/error-message';
import useViewer from "hooks/viewer/useViewer";
import {withApollo} from "lib/apollo/withApollo";
import withAddressBook from "containers/address/withAddressBook";
import inject from "hocs/inject";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const [
    account,
    loading,
    refetch
  ] = useViewer();

  //--console.log(account)
  //--console.log('pulkittt')

  if (!account || loading) {
    return <div>loading...</div>;
  }
  if (!account) return <ErrorMessage message={"User Not logged in"} />;
  return (
    <>
      <SEO title="Profile - PickBazar" description="Profile Details" />
      <ProfileProvider initData={account}>
        <Modal>
          <PageWrapper>
            <ContentBox>
              <SettingsContent deviceType={deviceType} />
            </ContentBox>

            <Footer />
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default withApollo()(withAddressBook(inject("authStore", "uiStore")(ProfilePage)));
