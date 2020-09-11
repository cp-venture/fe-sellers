import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { GET_LOGGED_IN_CUSTOMER } from '../fe-prod/src/graphql/query/customer.query';
import { ProfileProvider } from '../fe-prod/src/contexts/profile/profile.provider';
import SettingsContent from '../fe-prod/src/features/user-profile/settings/settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from '../fe-prod/src/features/user-profile/user-profile.style';
import Sidebar from '../fe-prod/src/features/user-profile/sidebar/sidebar';
import { SEO } from '../fe-prod/src/components/seo';
import Footer from '../fe-prod/src/layouts/footer';
import ErrorMessage from '../fe-prod/src/components/error-message/error-message';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER);
  if (!data || loading) {
    return <div>loading...</div>;
  }
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <SEO title="Profile - PickBazar" description="Profile Details" />
      <ProfileProvider initData={data.me}>
        <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
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

export default ProfilePage;
