import { NextPage } from 'next';
import Sticky from 'react-stickynode';
import {
  StyledContainer,
  StyledContent,
  StyledLink,
  StyledLeftContent,
  StyledLeftInnerContent,
  StyledRightContent,
  StyledContentHeading,
} from 'src/features/terms-and-services/terms-and-services';
import { Heading } from 'src/components/heading/heading';
import { Element } from 'react-scroll';
import { privacyData } from 'src/data/privacy';
import { SEO } from 'src/components/seo';
import { useMedia } from 'src/utils/use-media';

const PrivacyPage: NextPage<{}> = () => {
  const { title, date, content } = privacyData;
  const mobile = useMedia('(max-width: 580px)');
  const menuItems: string[] = [];
  content.forEach((item) => {
    menuItems.push(item.title);
  });

  return (
    <>
      <SEO title={title} description="PickBazar privacy page" />

      <StyledContainer>
        <Heading title={title} subtitle={`Last update: ${date}`} />

        <StyledContent>
          <StyledLeftContent>
            <Sticky top={mobile ? 68 : 150} innerZ="1">
              <StyledLeftInnerContent>
                {menuItems.map((item) => (
                  <StyledLink
                    key={item}
                    activeClass="active"
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-276}
                    duration={500}
                  >
                    {item}
                  </StyledLink>
                ))}
              </StyledLeftInnerContent>
            </Sticky>
          </StyledLeftContent>
          <StyledRightContent>
            {content.map((item, idx) => {
              return (
                <Element
                  name={item.title}
                  style={{ paddingBottom: 40 }}
                  key={idx}
                >
                  <StyledContentHeading>{item.title}</StyledContentHeading>
                  <div
                    className="html-content"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                </Element>
              );
            })}
          </StyledRightContent>
        </StyledContent>
      </StyledContainer>
    </>
  );
};

export default PrivacyPage;
